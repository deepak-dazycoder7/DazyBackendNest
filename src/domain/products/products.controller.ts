import { Body, Controller, Post, Put, Param, Delete, Get, Inject, SetMetadata, UseGuards, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from 'src/domain/products/dtos/create.product.dto';
import { UpdateProductDto } from 'src/domain/products/dtos/update.product.dto';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreateProductHandler, UpdateProductHandler, DeleteProductHandler, ReadProductHandler, UploadFileHandler } from 'src/domain/products/permission-abilities/product.policy';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt.auth.guard';
import { ProductGuard } from './guards/permission.guard';
import { UploadFileDto } from 'src/domain/products/dtos/upload.file.dto';
import { multerOptions } from './multer-config';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';


@Controller('products')
@UseGuards(ProductGuard, JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('CREATE_RESPONSE') private readonly returnResponse
  ) { }

  // Create product
  @Post('create')
  @SetMetadata(CHECK_POLICIES_KEY, [new CreateProductHandler()])
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<any> {
    try {
      const product = await this.productService.createProduct(createProductDto);
      return this.returnResponse('Product Created Successfully', 201, product);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }

  // Update product
  @Put('update/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new UpdateProductHandler()])
  async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<any> {
    try {
      const product = await this.productService.updateProduct(id, updateProductDto);
      return this.returnResponse('Product details Updated Successfully', 201, product);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }

  // Delete product
  @Delete('remove/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new DeleteProductHandler()])
  async deleteProduct(@Param('id') id: number): Promise<any> {
    try {
      await this.productService.deleteProduct(id);
      return this.returnResponse(`Product Id ${id} has been deleted`, 201, null);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }

  // Get/read product by id
  @Get('/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadProductHandler()])
  async getOne(@Param('id') id: number): Promise<any> {
    try {
      const product = await this.productService.getProductById(id);
      return this.returnResponse(`Product Id ${id} Fetched Successfully`, 201, product);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }

  // Get all products
  @Get()
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadProductHandler()])
  async getAll(): Promise<any> {
    try {
      const products = await this.productService.getAllProducts();
      return this.returnResponse('All Products Fetched Successfully', 200, products);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }

  //product file uploades
  @Post('upload/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new UploadFileHandler()])
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 5 },
        { name: 'videos', maxCount: 2 },
      ],
      multerOptions, // Optional if you have specific multer configurations
      
    ),
    
  )
  async uploadFiles(
    @Param('id') id: number,
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFiles()
    files: { images?: Express.Multer.File[]; videos?: Express.Multer.File[] },
  ) {
    try {
      if (!files || (!files.images && !files.videos)) {
        throw new BadRequestException('At least one file (image or video) is required');
      }
      
    
      // Validate image files (max size: 3 MB, file types: jpg, jpeg, png, gif)
      if (files.images) {
        for (const file of files.images) {
          new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 3 * 1024 * 1024 }), // 3 MB
              new FileTypeValidator({ fileType: /^(image\/jpeg|image\/jpg|image\/png|image\/gif)$/ }),
            ],
          }).transform(file);
        }
      }

      // Validate video files (max size: 10 MB, file types: mp4, mkv, avi)
      if (files.videos) {
        for (const file of files.videos) {
          new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 15 * 1024 * 1024 }), // 10 MB
              new FileTypeValidator({ fileType: /^(video\/mp4|video\/mkv|video\/avi)$/ }),
            ],
          }).transform(file);
        }
      }

      // Call the service to handle the files
      const productFile = await this.productService.uploadFiles(id, uploadFileDto, files);
      return this.returnResponse('Files uploaded successfully', 200, productFile);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }
}
  


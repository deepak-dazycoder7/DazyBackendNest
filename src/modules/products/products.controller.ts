import { Body, Controller, Post, Put, Param, Delete, Get, Inject, SetMetadata, UseGuards, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from 'src/dtos/create.product.dto';
import { UpdateProductDto } from 'src/dtos/update.product.dto';
import { CHECK_POLICIES_KEY } from 'src/decorators/policies.decorator';
import { CreateProductHandler, UpdateProductHandler, DeleteProductHandler, ReadProductHandler, UploadFileHandler } from 'src/casl/product.policy';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { ProductGuard } from 'src/guards/product-permission.guard';
import { UploadFileDto } from 'src/dtos/upload.file.dto';
import { multerConfig } from './multer-config';
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
      console.error('Error creating product:', error);
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      { name: 'videos', maxCount: 2 },
    ], multerConfig)
  )
  async uploadFiles(
    @Param('id') id: number,
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFiles() files: { images?: Express.Multer.File[], videos?: Express.Multer.File[] },
  ) {
    try {
      if (!files || (!files.images && !files.videos)) {
        throw new BadRequestException('At least one file (image or video) is required');
      }
      console.log('Files:', files);

      const productFile = await this.productService.uploadFiles(id, uploadFileDto, files);
      return { message: 'Files uploaded successfully', status: 200, data: productFile };
    } catch (error) {
      return { message: error.message, status: 500, data: null };
    }
  }
}


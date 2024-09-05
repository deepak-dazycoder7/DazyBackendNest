import { Body, Controller, Post, Put, Param, Delete, Get, Inject, SetMetadata, UseGuards, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from 'src/domain/property/dtos/create.property.dto';
import { UpdatePropertyDto } from 'src/domain/property/dtos/update.property.dto';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreatePropertyHandler, UpdatePropertyHandler, DeletePropertyHandler, ReadPropertyHandler, UploadFileHandler } from 'src/domain/property/permission-abilities/property.policy';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt.auth.guard';
import { PropertyGuard } from './guards/permission.guard';
import { UploadFileDto } from 'src/domain/property/dtos/upload.file.dto';
import { multerOptions } from './multer-config';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';


@Controller('property')
@UseGuards(PropertyGuard, JwtAuthGuard)
export class PropertyController {
  constructor(
    private readonly PropertyService: PropertyService,
    @Inject('CREATE_RESPONSE') private readonly returnResponse
  ) {}

  // Create Property
  @Post('create')
  @SetMetadata(CHECK_POLICIES_KEY, [new CreatePropertyHandler()])
  async createProperty(@Body() createPropertyDto: CreatePropertyDto): Promise<any> {
    try {
      const Property = await this.PropertyService.createProperty(createPropertyDto);
      return this.returnResponse('Property Created Successfully', 201, Property);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }

  // Update Property
  @Put('update/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new UpdatePropertyHandler()])
  async updateProperty(@Param('id') id: number, @Body() updatePropertyDto: UpdatePropertyDto): Promise<any> {
    try {
      const Property = await this.PropertyService.updateProperty(id, updatePropertyDto);
      return this.returnResponse('Property details Updated Successfully', 201, Property);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }

  // Delete Property
  @Delete('remove/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new DeletePropertyHandler()])
  async deleteProperty(@Param('id') id: number): Promise<any> {
    try {
      await this.PropertyService.deleteProperty(id);
      return this.returnResponse(`Property Id ${id} has been deleted`, 201, null);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }

  // Get/read Property by id
  @Get('/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadPropertyHandler()])
  async getOne(@Param('id') id: number): Promise<any> {
    try {
      const Property = await this.PropertyService.getPropertyById(id);
      return this.returnResponse(`Property Id ${id} Fetched Successfully`, 201, Property);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }

  // Get all Propertys
  @Get()
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadPropertyHandler()])
  async getAll(): Promise<any> {
    try {
      const Propertys = await this.PropertyService.getAllPropertys();
      return this.returnResponse('All Propertys Fetched Successfully', 200, Propertys);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }

  //Property file uploades
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
              new FileTypeValidator({ fileType: /^(image\/jpeg|image\/jpg|image\/png)$/ }),
            ],
          }).transform(file);
        }
      }

      // Validate video files (max size: 10 MB, file types: mp4, mkv, avi)
      if (files.videos) {
        for (const file of files.videos) {
          new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 15 * 1024 * 1024 }), // 15 MB
              new FileTypeValidator({ fileType: /^(video\/mp4|video\/mkv|video\/avi)$/ }),
            ],
          }).transform(file);
        }
      }

      // Call the service to handle the files
      const PropertyFile = await this.PropertyService.uploadFiles(id, uploadFileDto, files);
      return this.returnResponse('Files uploaded successfully', 200, PropertyFile);
    } catch (error) {
      return this.returnResponse(error.message, 500, null);
    }
  }
}
  


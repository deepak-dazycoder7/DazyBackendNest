import { Controller, Get, Post, Body, Param, UseGuards, Inject, Delete } from '@nestjs/common';
import { PropertyTypeService } from './property-type.service';
import { CreatePropertyTypeDto } from './dtos/create-propertyType.dto';
import { UpdatePropertyTypeDto } from './dtos/update-propertyType.dto';
import { PropertyTypeEntity } from './entity/property-type.entity';
import { DeleteResult } from 'typeorm';

@Controller('property-types')
@UseGuards()
export class PropertyTypeController {
  constructor(
    private readonly propertyTypeService: PropertyTypeService,
    @Inject('CREATE_RESPONSE') private readonly returnResponse
  ) { }

  //create ProepertyType
  @Post()
  async createPropertyType(@Body() CreatePropertyTypeDto: CreatePropertyTypeDto): Promise<PropertyTypeEntity> {
    try {
      const propertyType = await this.propertyTypeService.createPropertyType(CreatePropertyTypeDto);
      return this.returnResponse(`PropertyType successfully created`, 200, propertyType)

    } catch (error) {
      return this.returnResponse(error.message, 500, null)
    }
  }

  //update property type
  @Post(':id')
  async updatePropertytype(@Param('id') id: number ,@Body() updatePropertyTypeDto : UpdatePropertyTypeDto): Promise<PropertyTypeEntity> {
    try {
      const proepertytype = await this.propertyTypeService.updatePropertType(id, updatePropertyTypeDto);
      return this.returnResponse(`PropertyType id ${id} Successfully Updated`, 200, proepertytype)
    } catch (error) {
      return this.returnResponse(error.message, 500, null)
    }
  }

  //delete property type
  @Delete(':id')
  async deletePropertyType(@Param('id')id: number): Promise<DeleteResult> {
    try {
    const propertyType = await this.propertyTypeService.deletePropertyType(id);
    return this.returnResponse(`PropertyType id ${id} Successfully Deleted`, 200, propertyType)
      
    } catch (error) {
     return this.returnResponse(error.message, 500, null)
    }
  }
  @Get()
  async findAll() {
    try {
      const proepertytype = await this.propertyTypeService.findAll();
      return this.returnResponse('All PropertyType Fetched Successfully', 200, proepertytype)
    } catch (error) {
      return this.returnResponse(error.message, 500, null)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<any> {
    try {
    const propertyType = await this.propertyTypeService.findOne(id);
      return this.returnResponse(`PropertyType id ${id} Successfully Fetching`, 200, propertyType)
    } catch (error) {
      return this.returnResponse(error.message, 500, null)
    }
  }
}

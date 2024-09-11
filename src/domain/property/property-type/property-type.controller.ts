import { Controller, Get, Post, Body, Param, Inject, Delete, Req, Put } from '@nestjs/common';
import { PropertyTypeService } from './property-type.service';
import { CreatePropertyTypeDto } from './dtos/create-propertyType.dto';
import { UpdatePropertyTypeDto } from './dtos/update-propertyType.dto';
import { PropertyTypeEntity } from './entity/property-type.entity';
import { I18n, I18nContext,  } from 'nestjs-i18n';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';

@Controller('property/types')
export class PropertyTypeController {
  constructor(
    private readonly propertyTypeService: PropertyTypeService,
    @Inject('CREATE_RESPONSE') private readonly ResponseService,
  ) { }

  //create 
  @Post('create')
  async createPropertyType(@Body() Dto: CreatePropertyTypeDto, @I18n() i18n: I18nContext, @Req() req : CustomRequest): Promise<PropertyTypeEntity> {
    try {
      const createdBy = req.user?.sub;
      const propertyType = await this.propertyTypeService.createPropertyType(Dto, createdBy);
      return this.ResponseService(i18n.t('message.create_success.property'), 200, propertyType)
    } catch (error) {
      return this.ResponseService(error.message, 400, null)
    }
  }

  //update 
  @Put('/:id')
  async updatePropertytype(@Param('id') id: number, @Body() Dto: UpdatePropertyTypeDto, @I18n() i18n: I18nContext): Promise<PropertyTypeEntity> {
    try {
      const proepertytype = await this.propertyTypeService.updatePropertType(id, Dto);
      return this.ResponseService(i18n.t('message.update_success.property'), 200, proepertytype)
    } catch (error) {
      return this.ResponseService(error.message, 400, null)
    }
  }

  //delete 
  @Delete('/:id')
  async deletePropertyType(@Param('id') id: number, @I18n() i18n: I18nContext, @Req() req : CustomRequest): Promise<void> {
    try {
      const deleteBy = req.user?.sub
      const propertyType = await this.propertyTypeService.softDeletePropertyType(id, deleteBy);
      return this.ResponseService(i18n.t('message.delete_success.property'), 200, propertyType)

    } catch (error) {
      return this.ResponseService(error.message, 400, null)
    }
  }

  //get all
  @Get()
  async findAll(@I18n() i18n: I18nContext) {
    try {
      const proepertytype = await this.propertyTypeService.findAll();
      return this.ResponseService(i18n.t('message.fetch_success.property'), 200, proepertytype)
    } catch (error) {
      return this.ResponseService(error.message, 400, null)
    }
  }

  //get one
  @Get(':id')
  async findOne(@Param('id') id: number, @I18n() i18n : I18nContext): Promise<any> {
    try {
      const propertyType = await this.propertyTypeService.findOne(id);
      return this.ResponseService(i18n.t('message.fetch_success.property'), 200, propertyType)
    } catch (error) {
      return this.ResponseService(error.message, 400, null)
    }
  }
}

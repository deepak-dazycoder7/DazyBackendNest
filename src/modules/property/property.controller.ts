import { Body, Controller, Post, Put, Param, Delete, Get, Inject, SetMetadata, UseGuards, Req } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from 'src/modules/property/dtos/create.property.dto';
import { UpdatePropertyDto } from 'src/modules/property/dtos/update.property.dto';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreatePropertyHandler, UpdatePropertyHandler, DeletePropertyHandler, ReadPropertyHandler } from 'src/modules/property/permission-abilities/property.policy';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt.auth.guard';
import { PropertyGuard } from './guards/permission.guard';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';


@Controller()
@UseGuards(PropertyGuard, JwtAuthGuard)
export class PropertyController {
  constructor(
    private readonly PropertyService: PropertyService,
    @Inject('CREATE_RESPONSE') private readonly ResponseService,
    private readonly i18n: I18nService
  ) { }

  // Create
  @Post()
  @SetMetadata(CHECK_POLICIES_KEY, [new CreatePropertyHandler()])
  async createProperty(@Body() createPropertyDto: CreatePropertyDto, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<any> {
    try {
      const createdBy = req.user?.sub;
      const Property = await this.PropertyService.createProperty(createPropertyDto, createdBy);
      return this.ResponseService(i18n.t('message.create_success.property'), 200, Property);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }

  // Update
  @Put(':id')
  @SetMetadata(CHECK_POLICIES_KEY, [new UpdatePropertyHandler()])
  async updateProperty(@Param('id') id: number, @Body() updatePropertyDto: UpdatePropertyDto, @I18n() i18n: I18nContext): Promise<any> {
    try {
      const Property = await this.PropertyService.updateProperty(id, updatePropertyDto);
      return this.ResponseService(i18n.t('message.update_success.property'), 200, Property);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }

  // Delete
  @Delete(':id')
  @SetMetadata(CHECK_POLICIES_KEY, [new DeletePropertyHandler()])
  async deleteProperty(@Param('id') id: number, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<any> {
    try {
      const deletedBy = req.user?.sub
      await this.PropertyService.softDeletePropertyType(id, deletedBy);
      return this.ResponseService(i18n.t('message.delete_success.property'), 200, null);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }

  // Get/read
  @Get(':id')
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadPropertyHandler()])
  async getOne(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<any> {
    try {
      const Property = await this.PropertyService.getPropertyById(id);
      return this.ResponseService(i18n.t('message.fetch_success.property'), 200, Property);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }

  // Get all
  @Get()
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadPropertyHandler()])
  async getAll(@I18n() i18n: I18nContext): Promise<any> {
    try {
      const Propertys = await this.PropertyService.getAllPropertys();
      return this.ResponseService(i18n.t('message.fetch_success.property'), 200, Propertys);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }
}
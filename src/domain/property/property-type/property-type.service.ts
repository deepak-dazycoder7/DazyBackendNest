import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PropertyTypeEntity } from 'src/domain/property/property-type/entity/property-type.entity';
import { PropertyTypeRepository } from 'src/domain/property/property-type/repository/property-type.repository';
import { CreatePropertyTypeDto } from 'src/domain/property/property-type//dtos/create-propertyType.dto';
import { UpdatePropertyTypeDto } from 'src/domain/property/property-type/dtos/update-propertyType.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class PropertyTypeService {
  constructor(
    @InjectRepository(PropertyTypeEntity)
    private readonly propertyTypeRepository: PropertyTypeRepository,
    private readonly i18n: I18nService,
    private readonly datasource: DataSource
  ) { }

  //create 
  async createPropertyType(Dto: CreatePropertyTypeDto, userId : number): Promise<PropertyTypeEntity> {
    const propertyType = this.propertyTypeRepository.create({...Dto, created_by: userId});
    return this.propertyTypeRepository.save(propertyType);
  }

  // Update
  async updatePropertType(id: number, Dto: UpdatePropertyTypeDto): Promise<PropertyTypeEntity> {
    const propertyType = this.propertyTypeRepository.create({ ...Dto, id });
    return this.propertyTypeRepository.save(propertyType);
  }

  // Delete 
 async softDeletePropertyType(id: number, deleted_by: number): Promise<void> {
  await this.datasource
    .getRepository(PropertyTypeEntity)
    .createQueryBuilder()
    .update(PropertyTypeEntity)
    .set({ deleted_at: new Date(), deleted_by: deleted_by })  
    .where("id = :id", { id })
    .execute();
}
  //find all
  async findAll(): Promise<PropertyTypeEntity[]> {
    const propertyType = await this.propertyTypeRepository.find();
    if (!propertyType || propertyType.length === 0) {
      const errorMessage = await this.i18n.t('errors.not_found.property', { lang: I18nContext.current().lang })
      throw new NotFoundException(errorMessage)
    }
    return propertyType;
  }
  //find one
  async findOne(id: number): Promise<PropertyTypeEntity> {
    const propertyType = await this.propertyTypeRepository.findOne({ where: { id } });
    if (!propertyType) {
      const errorMessage = await this.i18n.t('errors.not_found.property', { lang: I18nContext.current().lang })
      throw new NotFoundException(errorMessage);
    }
    return propertyType;
  }
}

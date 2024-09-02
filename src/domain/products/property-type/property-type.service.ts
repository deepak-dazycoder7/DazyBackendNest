import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { PropertyTypeEntity } from './entity/property-type.entity';
import { PropertyTypeRepository } from './repository/property-type.repository';
import { CreatePropertyTypeDto } from './dtos/create-propertyType.dto';
import { UpdatePropertyTypeDto } from './dtos/update-propertyType.dto';
@Injectable()
export class PropertyTypeService {
  constructor(
    @InjectRepository(PropertyTypeEntity)
    private readonly propertyTypeRepository: PropertyTypeRepository,
  ) { }

  //create property type
  async createPropertyType(createpropertyTypeDto: CreatePropertyTypeDto): Promise<PropertyTypeEntity> {
    const propertyType = this.propertyTypeRepository.create(createpropertyTypeDto);
    return await this.propertyTypeRepository.save(propertyType);
  }

  // Update property type
  async updatePropertType(id: number, updatePropertyTypeDto: UpdatePropertyTypeDto): Promise<PropertyTypeEntity> {
    const propertyType = this.propertyTypeRepository.create({ ...updatePropertyTypeDto, id });
    return this.propertyTypeRepository.save(propertyType);
  }

   // Delete a property type
   async deletePropertyType(id: number): Promise<DeleteResult> {
    return this.propertyTypeRepository.delete(id);

  }
  //find all
  async findAll(): Promise<PropertyTypeEntity[]> {
    return await this.propertyTypeRepository.find();
  }
  //find one
  async findOne(id: number): Promise<PropertyTypeEntity> {
    const propertyType = await this.propertyTypeRepository.findOne({ where: { id } });
    if (!propertyType) {
      throw new NotFoundException('Product not found');
    }
    return propertyType;
  }
}

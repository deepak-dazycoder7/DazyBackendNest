import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from './dtos/create.property.dto';
import { PropertyEntity } from 'src/modules/property/entity/property.entity';
import { PropertyRepository } from 'src/modules/property/repository/property.repository';
import { UpdatePropertyDto } from 'src/modules/property/dtos/update.property.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';


@Injectable()
export class PropertyService {
    constructor(
        @InjectRepository(PropertyEntity)
        private readonly propertyRepository: PropertyRepository,
        private readonly i18n: I18nService,
        private readonly datasource: DataSource
    ) { }

    // Create 
    async createProperty(createPropertyDto: CreatePropertyDto, userId: number): Promise<PropertyEntity> {
        const Property = this.propertyRepository.create({ ...createPropertyDto, created_by: userId });
        return this.propertyRepository.save(Property);
    }

    // Update 
    async updateProperty(id: number, updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity> {
        const Property = await this.propertyRepository.findOne({ where: { id } })
        Object.assign(Property, updatePropertyDto);
        return this.propertyRepository.save(Property);
    }

    // Delete 
    async softDeleteProperty(id: number, deleted_by: number): Promise<void> {
        await this.datasource
            .getRepository(PropertyEntity)
            .createQueryBuilder()
            .update(PropertyEntity)
            .set({ deleted_at: new Date(), deleted_by: deleted_by })
            .where("id = :id", { id })
            .execute();
    }

    // Get one
    async getPropertyById(id: number): Promise<PropertyEntity> {
        const property = await this.propertyRepository.findOne({ where: { id } });
        if (!property) {
            const errorMessage = await this.i18n.t('errors.not_found.property', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return property;
    }

    // Get all 
    async getAllPropertys(): Promise<PropertyEntity[]> {
        const property = await this.propertyRepository.find();
        if (!property || property.length === 0) {
            const errorMessage = await this.i18n.t('errors.not_found.property', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return property
    }

}   
import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from 'src/modules/property/dtos/create.property.dto';
import { PropertyEntity } from 'src/modules/property/entity/property.entity';
import { PropertyRepository } from 'src/modules/property/repository/property.repository';
import { UpdatePropertyDto } from 'src/modules/property/dtos/update.property.dto';
import { UploadFileDto } from 'src/modules/property/dtos/upload.file.dto';
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

    // Create a new Property
    async createProperty(createPropertyDto: CreatePropertyDto, userId: number): Promise<PropertyEntity> {
        const Property = this.propertyRepository.create({ ...createPropertyDto, created_by: userId });
        return this.propertyRepository.save(Property);
    }

    // Update a Property by ID
    async updateProperty(id: number, updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity> {
        const Property = await this.propertyRepository.findOne({ where: { id } })
        Object.assign(Property, updatePropertyDto);
        return this.propertyRepository.save(Property);
    }

    // Delete a Property by ID
    async softDeletePropertyType(id: number, deleted_by: number): Promise<void> {
        await this.datasource
            .getRepository(PropertyEntity)
            .createQueryBuilder()
            .update(PropertyEntity)
            .set({ deleted_at: new Date(), deleted_by: deleted_by })
            .where("id = :id", { id })
            .execute();
    }

    // Get a Property by ID
    async getPropertyById(id: number): Promise<PropertyEntity> {
        const property = await this.propertyRepository.findOne({ where: { id } });
        if (!property) {
            const errorMessage = await this.i18n.t('errors.not_found.property', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return property;
    }

    // Get all Propertys
    async getAllPropertys(): Promise<PropertyEntity[]> {
        const property = await this.propertyRepository.find();
        if (!property || property.length === 0) {
            const errorMessage = await this.i18n.t('errors.not_found.property', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return property
    }

    //uploade files
    // async uploadFiles(id: number, uploadFileDto: UploadFileDto,  files: { images?: Express.Multer.File[], videos?: Express.Multer.File[] }): Promise<PropertyEntity> {
    //     const Property = await this.propertyRepository.findOne({ where: { id } });
    //     if (!Property) {
    //         const errorMessage = await this.i18n.t('errors.not_found.property', { lang: I18nContext.current().lang });
    //         throw new NotFoundException(errorMessage);
    //     }

    //     // Save image files 
    //     const savedImages = [];
    //     if (files.images) {
    //         for (const file of files.images) {
    //             const filePath = file.path; // Get the file path
    //             savedImages.push(filePath); // Use the file path
    //         }
    //     }

    //     // Save video files 
    //     const savedVideos = [];
    //     if (files.videos) {
    //         for (const file of files.videos) {
    //             const filePath = file.path; // Get the file path
    //             savedVideos.push(filePath); // Use the file path
    //         }
    //     }

    //     // Update Property with file paths
    //     Property.images = [...(Property.images || []), ...savedImages];
    //     Property.videos = [...(Property.videos || []), ...savedVideos];

    //     // Update Property details if provided
    //     if (uploadFileDto.property_file_name) {
    //         Property.property_name = uploadFileDto.property_file_name;
    //     }
    //     if (uploadFileDto.description) {
    //         Property.description = uploadFileDto.description;
    //     }

    //     // Save the updated Property entity
    //     return this.propertyRepository.save(Property);
    // }
}   
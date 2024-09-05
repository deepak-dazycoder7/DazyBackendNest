import { NotFoundException, Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from 'src/domain/property/dtos/create.property.dto';
import { PropertyEntity } from 'src/domain/property/entity/property.entity';
import { PropertyRepository } from 'src/domain/property/repository/property.repository';
import { UpdatePropertyDto } from 'src/domain/property/dtos/update.property.dto';
import { UploadFileDto } from 'src/domain/property/dtos/upload.file.dto';


@Injectable()
export class PropertyService {
    constructor(
        @InjectRepository(PropertyEntity)
        private readonly PropertyRepository: PropertyRepository,
    ) { }

    // Create a new Property
    async createProperty(createPropertyDto: CreatePropertyDto): Promise<PropertyEntity> {
        const existingProperty = await this.PropertyRepository.findOne({
            where: { name: createPropertyDto.name }
        });

        if (existingProperty) {
            throw new ConflictException('Property with this name already exists');
        }

        const Property = this.PropertyRepository.create(createPropertyDto);
        return this.PropertyRepository.save(Property);
    }

    // Update a Property by ID
    async updateProperty(id: number, updatePropertyDto: UpdatePropertyDto): Promise<PropertyEntity> {
        const Property = await this.PropertyRepository.findOne({ where: { id } });

        if (!Property) {
            throw new NotFoundException('Property not found');
        }

        Object.assign(Property, updatePropertyDto);
        return this.PropertyRepository.save(Property);
    }

    // Delete a Property by ID
    async deleteProperty(id: number): Promise<void> {
        const Property = await this.PropertyRepository.delete(id);
        if (Property.affected === 0) {
            throw new NotFoundException('Property not found');
        }
    }

    // Get a Property by ID
    async getPropertyById(id: number): Promise<PropertyEntity> {
        const Property = await this.PropertyRepository.findOne({ where: { id } });
        if (!Property) {
            throw new NotFoundException('Property not found');
        }
        return Property;
    }

    // Get all Propertys
    async getAllPropertys(): Promise<PropertyEntity[]> {
        return this.PropertyRepository.find();
    }

    //uploade files
    async uploadFiles(id: number, uploadFileDto: UploadFileDto, files: { images?: Express.Multer.File[], videos?: Express.Multer.File[] }): Promise<PropertyEntity> {
        const Property = await this.PropertyRepository.findOne({ where: { id } });
        if (!Property) {
            throw new NotFoundException('Property not found');
        }

        // Save image files 
        const savedImages = [];
        if (files.images) {
            for (const file of files.images) {
                const filePath = file.path; // Get the file path
                savedImages.push(filePath); // Use the file path
            }
        }

        // Save video files 
        const savedVideos = [];
        if (files.videos) {
            for (const file of files.videos) {
                const filePath = file.path; // Get the file path
                savedVideos.push(filePath); // Use the file path
            }
        }

        // Update Property with file paths
        Property.images = [...(Property.images || []), ...savedImages];
        Property.videos = [...(Property.videos || []), ...savedVideos];

        // Update Property details if provided
        if (uploadFileDto.name) {
            Property.name = uploadFileDto.name;
        }
        if (uploadFileDto.description) {
            Property.description = uploadFileDto.description;
        }

        // Save the updated Property entity
        return this.PropertyRepository.save(Property);
    }
}   
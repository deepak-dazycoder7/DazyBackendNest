import { NotFoundException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileDto } from './dtos/create.file.dto';
import { FilesEntity } from './entity/file.entity';
import { FilesRepository } from './repository/Files.repository';
import { UpdateFileDto } from './dtos/update.file.dto';
import { I18nService, I18nContext } from 'nestjs-i18n';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as sharp from 'sharp';
import { Request } from 'express';
import { PropertyRepository } from '../repository/property.repository';
import { getUploadRules } from './file-upload-rules';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FilesEntity)
        private readonly FilesRepository: FilesRepository,
        private readonly i18n: I18nService,
        @Inject(forwardRef(() => PropertyRepository))
        private readonly propertyRepository: PropertyRepository,
    ) { }

    async compressAndSaveImage(
        files: Express.Multer.File[],
        userId: number,
        dto: CreateFileDto,
        req: Request,
        propertyId: number
    ): Promise<FilesEntity[]> {
        const uploadsDir = path.resolve(process.cwd(), 'uploads');
        await fs.mkdir(uploadsDir, { recursive: true });
        console.log('Property Repository:', this.propertyRepository);

        // Fetch property details to determine category and sub-category
        const property = await this.propertyRepository.findOne({ where: { id: propertyId } });

        if (!property) {
            throw new Error("Property not found");
        }

        // Get the category and sub-category from the property details
        const category = property.category_id; // Assuming category field
        const subCategory = property.subCategory_id; // Assuming subCategory field

        // Retrieve the upload rules using the dynamic method
        const rules = getUploadRules(category, subCategory,); // Assuming bathroomType is available in property
        if (!rules) {
            throw new Error("Upload rules not found for the given category and sub-category.");
        }

        let imagesCount = 0;
        let videosCount = 0;

        // Loop through each file to validate and process
        const fileEntities: FilesEntity[] = [];
        for (const file of files) {
            if (file.mimetype.startsWith('image/')) {
                imagesCount++;
            } else if (file.mimetype.startsWith('video/')) {
                videosCount++;
            }

            // Validate against the rules
            if (imagesCount > rules.images.room || videosCount > rules.video) {
                throw new Error("Exceeded upload limits based on property rules.");
            }

            const originalImagePath = path.join(uploadsDir, file.originalname);
            await fs.writeFile(originalImagePath, file.buffer); // Save the original file

            const fileSizeInMB = file.size / (1024 * 1024);
            let compressedImagePath = originalImagePath; // Default to original if no compression needed

            // Check if compression is needed and handle it
            if (fileSizeInMB > 1) {
                compressedImagePath = await this.compressImage(file, uploadsDir, originalImagePath);
            }

            // Generate the file URL for either compressed or original image
            const compressedImageUrl = this.generateFileUrl(req, compressedImagePath);

            const fileDtoWithUrls: CreateFileDto = {
                ...dto,
                url: compressedImageUrl,
            };

            const fileEntity = await this.createFiles(fileDtoWithUrls, userId);
            fileEntities.push(fileEntity); // Collect each file entity
        }

        return fileEntities; // Return all file entities
    }

    // The rest of the code remains the same...

    private async compressImage(file: Express.Multer.File, uploadsDir: string, originalImagePath: string): Promise<string> {
        const compressedImageName = `compressed-${Date.now()}-${file.originalname}`;
        const compressedImagePath = path.join(uploadsDir, compressedImageName);
        const format = file.mimetype.split('/')[1]; // Extract format (jpg, png, etc.)
        const sharpInstance = sharp(file.buffer);

        switch (format) {
            case 'jpeg':
            case 'jpg':
                await sharpInstance.jpeg({ quality: 30 }).toFile(compressedImagePath);
                break;
            case 'png':
                await sharpInstance.jpeg({ quality: 100 }).toFile(compressedImagePath); // Convert PNG to JPEG
                break;
            case 'webp':
                await sharpInstance.webp({ quality: 60 }).toFile(compressedImagePath);
                break;
            case 'gif':
                await sharpInstance.gif({ effort: 3 }).toFile(compressedImagePath);
                break;
            default:
                await fs.copyFile(originalImagePath, compressedImagePath);
                break;
        }

        return compressedImagePath; // Return the path of the compressed image
    }

    private generateFileUrl(req: Request, filePath: string): string {
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        return `${baseUrl}${path.basename(filePath)}`;
    }

    async createFiles(dto: CreateFileDto, userId: number): Promise<FilesEntity> {
        const fileEntity = this.FilesRepository.create({ ...dto, created_by: userId });
        return this.FilesRepository.save(fileEntity);
    }



    //update 
    async updateFiles(id: number, Dto: UpdateFileDto): Promise<FilesEntity> {
        await this.FilesRepository.update(id, Dto);
        return this.FilesRepository.findOne({ where: { id } });
    }


    //read 
    async getOneFiles(id: number): Promise<FilesEntity> {
        const Files = await this.FilesRepository.findOne({ where: { id } });
        if (!Files) {
            const errorMessage = this.i18n.translate('errors.not_found.Files', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return Files;
    }
    //read all 
    async getAllFiles(): Promise<FilesEntity[]> {
        const Files = await this.FilesRepository.find();
        if (!Files || Files.length === 0) {
            const errorMessage = this.i18n.translate('errors.not_found.Files', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return Files;
    }

}


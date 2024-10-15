import { NotFoundException, Injectable } from '@nestjs/common';
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
import { getUploadRules } from './file-upload-rules';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDto } from '../category/dtos/create.category.dto';
import { SubCategoryService } from '../sub-category/SubCategory.service';
import { SubCategoryDto } from '../sub-category/dtos/SubCategory.dto';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FilesEntity)
        private readonly FilesRepository: FilesRepository,
        private readonly i18n: I18nService,
        private readonly categoryService : CategoryService,
        private readonly subCategoryService : SubCategoryService
    ) { }

    // async compressAndSaveImage(
    //     file: Express.Multer.File,
    //     userId: number,
    //     dto: CreateFileDto,
    //     req: Request
    // ): Promise<FilesEntity> {
    //     const uploadsDir = path.resolve(process.cwd(), 'uploads');
    //     await fs.mkdir(uploadsDir, { recursive: true });

    //     const originalImagePath = path.join(uploadsDir, file.originalname);
    //     await fs.writeFile(originalImagePath, file.buffer); // Save the original file

    //     const fileSizeInMB = file.size / (1024 * 1024);
    //     let compressedImagePath = originalImagePath; // Default to original if no compression needed

    //     // Check if compression is needed and handle it
    //     if (fileSizeInMB > 1) {
    //         compressedImagePath = await this.compressImage(file, uploadsDir, originalImagePath);
    //     }

    //     // Generate the file URL for either compressed or original image
    //     const compressedImageUrl = this.generateFileUrl(req, compressedImagePath);

    //     const fileDtoWithUrls: CreateFileDto = {
    //         ...dto,
    //         url: compressedImageUrl,
    //     };

    //     return this.createFiles(fileDtoWithUrls, userId);
    // }

    // private async compressImage(file: Express.Multer.File, uploadsDir: string, originalImagePath: string): Promise<string> {
    //     const compressedImageName = `compressed-${Date.now()}-${file.originalname}`;
    //     const compressedImagePath = path.join(uploadsDir, compressedImageName);
    //     const format = file.mimetype.split('/')[1]; // Extract format (jpg, png, etc.)
    //     const sharpInstance = sharp(file.buffer);

    //     switch (format) {
    //         case 'jpeg':
    //         case 'jpg':
    //             await sharpInstance.jpeg({ quality: 30 }).toFile(compressedImagePath);
    //             break;
    //         case 'png':
    //             await sharpInstance.jpeg({ quality: 100 }).toFile(compressedImagePath); // Convert PNG to JPEG
    //             break;
    //         case 'webp':
    //             await sharpInstance.webp({ quality: 60 }).toFile(compressedImagePath);
    //             break;
    //         case 'gif':
    //             await sharpInstance.gif({ effort: 3 }).toFile(compressedImagePath);
    //             break;
    //         default:
    //             await fs.copyFile(originalImagePath, compressedImagePath);
    //             break;
    //     }

    //     return compressedImagePath; // Return the path of the compressed image
    // }

    // private generateFileUrl(req: Request, filePath: string): string {
    //     const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    //     return `${baseUrl}${path.basename(filePath)}`;
    // }

    // async createFiles(dto: CreateFileDto, userId: number): Promise<FilesEntity> {
    //     const fileEntity = this.FilesRepository.create({ ...dto, created_by: userId });
    //     return this.FilesRepository.save(fileEntity);
    // }



    //update 
   
   
   // Validate upload rules based on category, sub-category and bathroom type if applicable
  
  
   private validateUploadRules(
    files: Express.Multer.File[],
    category: string,
    subCategory: string,
    bathroomType?: string
): void {
    const uploadRules = getUploadRules(category, subCategory, bathroomType);

    const requiredImages = uploadRules.images;
    const requiredVideo = uploadRules.video;

    // Count uploaded images
    const imageFiles = files.filter(file => file.mimetype.startsWith('image'));
    const videoFiles = files.filter(file => file.mimetype.startsWith('video'));

    // Validate number of images
    Object.keys(requiredImages).forEach(imageType => {
        const requiredCount = requiredImages[imageType];
        const uploadedCount = imageFiles.filter(file => file.fieldname === imageType).length;
        if (uploadedCount < requiredCount) {
            throw new Error(`Insufficient images for ${imageType}. Required: ${requiredCount}, Uploaded: ${uploadedCount}`);
        }
    });

    // Validate number of videos
    if (videoFiles.length < requiredVideo) {
        throw new Error(`Insufficient video files. Required: ${requiredVideo}, Uploaded: ${videoFiles.length}`);
    }
}

async compressAndSaveImage(
    files: Express.Multer.File[],
    userId: number,
    dto: CreateFileDto,
    req: Request,
    id: number,
): Promise<FilesEntity[]> {
    // Step 1: Fetch category and subCategory details
    const category = await this.categoryService.findOne(id);
    const subCategory = await this.subCategoryService.findOne(id);

    if (!category || !subCategory) {
        throw new NotFoundException('Invalid category or subcategory');
    }

    // Step 2: Validate upload rules based on category, subCategory, and bathroomType
    this.validateUploadRules(files, category.category_name, subCategory.sub_category_name, );

    // Step 3: Create the upload directory
    const uploadsDir = path.resolve(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const savedFiles: FilesEntity[] = [];

    // Step 4: Iterate over all the files
    for (const file of files) {
        const originalImagePath = path.join(uploadsDir, file.originalname);
        await fs.writeFile(originalImagePath, file.buffer); // Save the original file

        const fileSizeInMB = file.size / (1024 * 1024);
        let compressedImagePath = originalImagePath; // Default to original if no compression needed

        // Step 5: Compress image if needed
        if (fileSizeInMB > 1) {
            compressedImagePath = await this.compressImage(file, uploadsDir, originalImagePath);
        }

        // Step 6: Generate file URL
        const compressedImageUrl = this.generateFileUrl(req, compressedImagePath);

        // Step 7: Save file info in DB
        const fileDtoWithUrls: CreateFileDto = {
            ...dto,
            url: compressedImageUrl,
            
        };

        // Create and save each file entity
        const savedFile = await this.createFiles(fileDtoWithUrls, userId);
        savedFiles.push(savedFile);
    }

    return savedFiles; // Return the saved files entities
}

private async compressImage(
    file: Express.Multer.File,
    uploadsDir: string,
    originalImagePath: string
): Promise<string> {
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


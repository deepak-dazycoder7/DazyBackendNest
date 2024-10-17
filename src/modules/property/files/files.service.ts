import { NotFoundException, Injectable, BadRequestException, } from '@nestjs/common';
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

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FilesEntity)
        private readonly FilesRepository: FilesRepository,
        private readonly i18n: I18nService,
    ) { }

    async compressAndSaveFile(
        files: Express.Multer.File[],
        userId: number,
        dto: CreateFileDto,
        req: Request,
    ): Promise<FilesEntity[]> {
        try {
            const { category, subCategory } = dto;

            // Fetch the rules for the selected category and subCategory
            const rules = this.getFilesUploadRules(category, subCategory);
            if (!rules) {
                throw new BadRequestException(`Invalid category or sub-category: ${category} -> ${subCategory}`);
            }

            // Create the upload directory if it doesn't exist
            const uploadsDir = path.resolve(process.cwd(), 'uploads');
            await fs.mkdir(uploadsDir, { recursive: true });

            // Validate and process file uploads for each required field
            const uploadedFiles: FilesEntity[] = [];
            const fileKeys = Object.keys(rules);

            for (const key of fileKeys) {
                const requiredFiles = rules[key]; // Expected number of files for this key
                const uploaded = files[key] || []; // Get uploaded files for the key

                // Check if the required number of files are uploaded
                if (uploaded.length !== requiredFiles) {
                    throw new BadRequestException(`Expected ${requiredFiles} file(s) for ${key}, but received ${uploaded.length}`);
                }

                // Handle each uploaded file
                for (const file of uploaded) {
                    const fileSizeInMB = file.size / (1024 * 1024);
                    const fileFormat = file.mimetype.split('/')[1]; // Get file format (jpg, png, etc.)
                    let finalFilePath: string;

                    if (['image', 'video'].includes(file.mimetype.split('/')[0])) {
                        if (file.mimetype.startsWith('image')) {
                            finalFilePath = await this.handleImageOrDocUpload(file, uploadsDir, fileFormat, fileSizeInMB);
                        } else if (file.mimetype.startsWith('video')) {
                            finalFilePath = await this.handleVideoUpload(file, uploadsDir, fileFormat);
                        }
                    } else {
                        throw new BadRequestException('Unsupported file type');
                    }

                    // Generate file URL
                    const fileUrl = this.generateFileUrl(req, finalFilePath);
                    const fileDtoWithUrl: CreateFileDto = { ...dto, url: fileUrl, type: key };

                    // Save the file record to the database
                    const fileEntity = await this.createFiles(fileDtoWithUrl, userId);
                    uploadedFiles.push(fileEntity);
                }
            }

            return uploadedFiles;
        } catch (error) {
            console.error('Error uploading file:', error.message);
            throw new BadRequestException('Failed to upload file. Please try again later.');
        }
    }


    // Method to retrieve the relevant file upload rules
    private getFilesUploadRules(category: string, subCategory: string) {
        try {
            // Ensure filesUploadRules is defined
            if (!filesUploadRules) {
                throw new Error('File upload rules configuration is not defined.');
            }
            const rules = filesUploadRules?.category?.[category]?.subCategory?.[subCategory];
            if (!rules) {
                throw new Error(`No rules found for category: ${category}, sub-category: ${subCategory}`);
            }
            return rules;
        } catch (error) {
            console.error('Error fetching file upload rules:', error.message);
            throw new Error('Invalid file upload rules. Please check your category and sub-category.');
        }
    }

    // Method to handle image and document uploads
    private async handleImageOrDocUpload(
        file: Express.Multer.File,
        uploadsDir: string,
        fileFormat: string,
        fileSizeInMB: number
    ): Promise<string> {
        let finalFilePath: string;
        if (fileSizeInMB > 1) {
            finalFilePath = await this.compressImageAndDocs(file, uploadsDir, fileFormat);
        } else {
            finalFilePath = path.join(uploadsDir, file.originalname);
            await fs.writeFile(finalFilePath, file.buffer);
        }
        return finalFilePath;
    }

    // Method to handle video uploads
    private async handleVideoUpload(
        file: Express.Multer.File,
        uploadsDir: string,
        fileFormat: string
    ): Promise<string> {
        if (['mp4', 'avi', 'mkv', 'mov'].includes(fileFormat)) {
            const finalFilePath = path.join(uploadsDir, file.originalname);
            await fs.writeFile(finalFilePath, file.buffer);
            return finalFilePath;
        } else {
            throw new Error('Unsupported video format. Accepted formats: mp4, avi, mkv, mov');
        }
    }


    private async compressImageAndDocs(
        file: Express.Multer.File,
        uploadsDir: string,
        format: string
    ): Promise<string> {
        const compressedFileName = `compressed-${Date.now()}-${file.originalname}`;
        const compressedFilePath = path.join(uploadsDir, compressedFileName);

        const sharpInstance = sharp(file.buffer);

        // Handle image and document formats
        switch (format) {
            case 'jpeg':
            case 'jpg':
                await sharpInstance.jpeg({ quality: 30 }).toFile(compressedFilePath);
                break;
            case 'png':
                await sharpInstance.jpeg({ quality: 100 }).toFile(compressedFilePath); // Convert PNG to JPEG
                break;
            case 'webp':
                await sharpInstance.webp({ quality: 60 }).toFile(compressedFilePath);
                break;
            case 'pdf':
            case 'doc':
            case 'docx':
                // For documents like PDFs, DOC/DOCX, we don't compress using Sharp but save it directly
                await fs.writeFile(compressedFilePath, file.buffer);
                break;
            default:
                throw new Error('Unsupported file format for compression');
        }

        return compressedFilePath; // Return the path of the compressed file
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


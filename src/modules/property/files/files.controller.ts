import { Body, Controller, Post, Put, Param, Inject, Get, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './Files.service';
import { CreateFileDto } from './dtos/create.file.dto';
import { UpdateFileDto } from './dtos/update.file.dto';
import { SetMetadata } from '@nestjs/common';
import { I18nContext, I18n } from 'nestjs-i18n';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreateFilesHandler, ReadFilesHandler, UpdateFilesHandler } from './permission-abilities/Files.policy';
import { FilesGuard } from './guard/files.guard';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
@UseGuards(FilesGuard)
export class FilesController {
    constructor(
        private readonly FilesService: FilesService,
        @Inject('CREATE_RESPONSE') private readonly ResponseService
    ) { }

    //create
    @Post('upload')
    @SetMetadata(CHECK_POLICIES_KEY, [new CreateFilesHandler()])
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads', // Directory where files will be stored
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
                    callback(null, fileName);
                },
            }),
            fileFilter: (req, file, callback) => {
                // Only accept specific file formats
                const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4', 'application/pdf'];
                if (allowedMimeTypes.includes(file.mimetype)) {
                    callback(null, true);
                } else {
                    callback(new Error('Invalid file type'), false);
                }
            },
        }),
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto, @I18n() i18n: I18nContext, @Req() req: CustomRequest) {
        try {
            const createdBy = req.user?.sub
            const fileUrl = `/uploads/${file.filename}`;
            createFileDto.url = fileUrl;
            createFileDto.format = extname(file.filename).replace('.', '');

            // Determine file type (image, video, document)
            if (file.mimetype.includes('image')) {
                createFileDto.type = 'image';
            } else if (file.mimetype.includes('video')) {
                createFileDto.type = 'video';
            } else if (file.mimetype === 'application/pdf') {
                createFileDto.type = 'document';
            }
            const Files = await this.FilesService.createFiles(createFileDto, createdBy);
            return this.ResponseService(i18n.t('message.success.create', { args: { entity: 'Files' } }), 200, Files);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }

    }

    //update
    @Put(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new UpdateFilesHandler()])
    async updateFiles(@Param('id') id: number, @Body() Dto: UpdateFileDto, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const Files = await this.FilesService.updateFiles(id, Dto);
            return this.ResponseService(i18n.t('message.update_success.user'), 200, Files);
        } catch (error) {
            return this.ResponseService(error.message, 400, null);
        }
    }


    // Get/read
    @Get(':id')
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadFilesHandler()])
    async getOneFiles(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<string> {
        try {
            const Files = await this.FilesService.getOneFiles(id);
            return this.ResponseService(i18n.t('message.fetch_success.user'), 200, Files)
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
    //get all
    @Get()
    @SetMetadata(CHECK_POLICIES_KEY, [new ReadFilesHandler()])
    async getAll(@I18n() i18n: I18nContext): Promise<string> {
        try {
            const Files = await this.FilesService.getAllFiles();
            return this.ResponseService(i18n.t('message.fetch_success.user'), 200, Files);
        } catch (error) {
            return this.ResponseService(error.message, 400, null)
        }
    }
}


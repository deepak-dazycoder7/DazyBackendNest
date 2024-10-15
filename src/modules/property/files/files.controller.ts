import { Body, Controller, Post, Put, Param, Inject, Get, UseGuards, Req, UploadedFile, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { FilesService } from './Files.service';
import { CreateFileDto } from './dtos/create.file.dto';
import { UpdateFileDto } from './dtos/update.file.dto';
import { SetMetadata } from '@nestjs/common';
import { I18nContext, I18n } from 'nestjs-i18n';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreateFilesHandler, ReadFilesHandler, UpdateFilesHandler } from './permission-abilities/Files.policy';
import { FilesGuard } from './guard/files.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesEntity } from './entity/file.entity';
;

@Controller()
@UseGuards(FilesGuard)
export class FilesController {
  constructor(
    private readonly FilesService: FilesService,
    @Inject('CREATE_RESPONSE') private readonly ResponseService
  ) { }

  @Post('upload')
  @SetMetadata(CHECK_POLICIES_KEY, [new CreateFilesHandler()])
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
    @I18n() i18n: I18nContext,
    @Req() req: CustomRequest,
  ): Promise<FilesEntity> {
    try {

      const createdBy = req.user?.sub;
      const createdFile = await this.FilesService.compressAndSaveImage(file, createdBy, createFileDto, req);
      return this.ResponseService(i18n.t('message.success.create', { args: { entity: 'Files' } }), 200, createdFile);
    } catch (error) {
      console.error('Error uploading file:', error);
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


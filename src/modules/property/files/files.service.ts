import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileDto } from './dtos/create.file.dto';
import { FilesEntity } from './entity/file.entity';
import { FilesRepository } from './repository/Files.repository';
import { UpdateFileDto } from './dtos/update.file.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FilesEntity)
        private readonly FilesRepository: FilesRepository,
        private readonly i18n: I18nService,
    ) { }

    //create 
    async createFiles(Dto: CreateFileDto, userId: number): Promise<FilesEntity> {
        const Files = this.FilesRepository.create({ ...Dto, created_by: userId });
        return this.FilesRepository.save(Files);
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
            const errorMessage = this.i18n.t('errors.not_found.Files', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return Files;
    }
    //read all 
    async getAllFiles(): Promise<FilesEntity[]> {
        const Files = await this.FilesRepository.find();
        if (!Files || Files.length === 0) {
            const errorMessage = this.i18n.t('errors.not_found.Files', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return Files;
    }

}


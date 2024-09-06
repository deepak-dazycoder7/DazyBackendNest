import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DivisionEntity } from './entity/division.entity';
import { DivisionRepository } from './repository/division.repository';
import { CreateDivisionDto } from './dtos/create.division.dto';
import { UpdateDivisionDto } from './dtos/update.division.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class DivisionService {
    constructor(
        @InjectRepository(DivisionEntity)
        private readonly divisionRepository: DivisionRepository,
        private readonly i18n: I18nService
    ) { }

    //create
    async createDivision(dto: CreateDivisionDto): Promise<DivisionEntity> {
        const division = await this.divisionRepository.create(dto);
        return this.divisionRepository.save(division);
    }

    // Update
    async updateDivision(id: number, dto: UpdateDivisionDto): Promise<DivisionEntity> {
        await this.divisionRepository.update(id, dto);
        return this.divisionRepository.findOne({ where: { id } });
    }

    // Delete
    async deleteDivision(id: number): Promise<void> {
        await this.divisionRepository.delete(id);

    }
    //find all
    async findAll(): Promise<DivisionEntity[]> {
        const division = await this.divisionRepository.find();
        if (!division || division.length === 0) {
            const errorMessage = await this.i18n.t('errors.not_found.division', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return division;
    }

    //find one
    async findOne(id: number): Promise<DivisionEntity> {
        const division = await this.divisionRepository.findOne({ where: { id } });
        if (!division) {
            const errorMessage = await this.i18n.t('errors.not_found.division', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return division;
    }
}

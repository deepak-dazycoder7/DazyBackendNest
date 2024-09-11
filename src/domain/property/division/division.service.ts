import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DivisionEntity } from './entity/division.entity';
import { DivisionRepository } from './repository/division.repository';
import { CreateDivisionDto } from './dtos/create.division.dto';
import { UpdateDivisionDto } from './dtos/update.division.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

@Injectable()
export class DivisionService {
    constructor(
        @InjectRepository(DivisionEntity)
        private readonly divisionRepository: DivisionRepository,
        private readonly i18n: I18nService,
        private readonly dataSource : DataSource
    ) { }

    //create
    async createDivision(createDivisionDto: CreateDivisionDto, userId: number): Promise<DivisionEntity> {
                const newDivision = this.divisionRepository.create({
          ...createDivisionDto,
          created_by: userId, 
        });
        return await this.divisionRepository.save(newDivision);
      }
    

    // Update
    async updateDivision(id: number, dto: UpdateDivisionDto): Promise<DivisionEntity> {
        await this.divisionRepository.update(id, dto);
        return this.divisionRepository.findOne({ where: { id } });
    }

    // Delete
    async softDeleteDivision(id: number, deleted_by: number): Promise<void> {
        await this.dataSource
          .getRepository(DivisionEntity)
          .createQueryBuilder()
          .update(DivisionEntity)
          .set({ deleted_at: new Date(), deleted_by: deleted_by })  
          .where("id = :id", { id })
          .execute();
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

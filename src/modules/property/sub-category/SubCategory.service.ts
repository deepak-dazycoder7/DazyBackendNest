import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SubCategoryEntity } from './entity/subCategory.entity';
import { SubCategoryRepository } from './repository/sub-category.repository';
import { SubCategoryDto } from './dtos/SubCategory.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectRepository(SubCategoryEntity)
        private readonly subcategoryRepository: SubCategoryRepository,
        private readonly i18n: I18nService,
        private readonly datasource: DataSource
    ) { }

    //create 
    async createSubCategory(Dto: SubCategoryDto, userId: number): Promise<SubCategoryEntity> {
        const SubCategory = this.subcategoryRepository.create({ ...Dto, created_by: userId });
        return this.subcategoryRepository.save(SubCategory);
    }

    // Update
    async updateSubCategory(id: number, dto: SubCategoryDto): Promise<SubCategoryEntity> {
        await this.subcategoryRepository.update(id, dto);
        return this.subcategoryRepository.findOne({ where: { id } });
    }
    // Delete 
    async softDeleteSubCategory(id: number, deleted_by: number): Promise<void> {
        await this.datasource
            .getRepository(SubCategoryEntity)
            .createQueryBuilder()
            .update(SubCategoryEntity)
            .set({ deleted_at: new Date(), deleted_by: deleted_by })
            .where("id = :id", { id })
            .execute();
    }
    //find all
    async findAll(): Promise<SubCategoryEntity[]> {
        const SubCategory = await this.subcategoryRepository.find();
        if (!SubCategory || SubCategory.length === 0) {
            const errorMessage = await this.i18n.t('errors.not_found.property', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return SubCategory;
    }
    //find one
    async findOne(id: number): Promise<SubCategoryEntity> {
        const SubCategory = await this.subcategoryRepository.findOne({ where: { id } });
        if (!SubCategory) {
            const errorMessage = await this.i18n.t('errors.not_found.property', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return SubCategory;
    }
}

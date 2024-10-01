import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategoryDto } from './dtos/create.category.dto';
import { UpdateCategoryDto } from './dtos/update.category.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: CategoryRepository,
        private readonly i18n: I18nService,
        private readonly dataSource : DataSource
    ) { }

    //create
    async createCategory(dto: CreateCategoryDto, userId: number): Promise<CategoryEntity> {
                const category = this.categoryRepository.create({
          ...dto,
          created_by: userId, 
        });
        return await this.categoryRepository.save(category);
      }
    

    // Update
    async updateCategory(id: number, dto: UpdateCategoryDto): Promise<CategoryEntity> {
        await this.categoryRepository.update(id, dto);
        return this.categoryRepository.findOne({ where: { id } });
    }

    // Delete
    async softDeleteCategory(id: number, deleted_by: number): Promise<void> {
        await this.dataSource
          .getRepository(CategoryEntity)
          .createQueryBuilder()
          .update(CategoryEntity)
          .set({ deleted_at: new Date(), deleted_by: deleted_by })  
          .where("id = :id", { id })
          .execute();
      }
    
    //find all
    async findAllCategory(): Promise<CategoryEntity[]> {
        const category = await this.categoryRepository.find();
        if (!category || category.length === 0) {
            const errorMessage = await this.i18n.t('errors.not_found.category', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage)
        }
        return category;
    }

    //find one
    async findOne(id: number): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            const errorMessage = await this.i18n.t('errors.not_found.category', { lang: I18nContext.current().lang })
            throw new NotFoundException(errorMessage);
        }
        return category;
    }
}

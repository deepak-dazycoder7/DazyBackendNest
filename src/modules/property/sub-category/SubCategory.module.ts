import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryEntity } from './entity/subCategory.entity';
import { SubCategoryService } from './SubCategory.service';
import { SubCategoryController } from './SubCategory.controller';
import { SubCategoryAbilityFactory } from './permission-abilities/subcategory.ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity])],
  providers: [SubCategoryService, SubCategoryAbilityFactory],
  controllers: [SubCategoryController],
  exports: [SubCategoryService],
})
export class SubCategoryModule {}

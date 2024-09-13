import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryAbilityFactory } from './permission-abilities/category.ability.factory';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    providers: [CategoryService, CategoryAbilityFactory ],
    controllers: [CategoryController],
    exports: [CategoryService],
})
export class CategoryModule { }

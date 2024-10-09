import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/modules/property/entity/property.entity';
import { PropertyAbilityFactory } from 'src/modules/property/permission-abilities/property-ability.factory';
import { PropertyGuard } from '../property/guards/permission.guard';
import { TypeModule } from './property-type/property-type.module';
import { DivisionModule } from './division/division.module';
import { CategoryModule } from './category/category.module';
import { RouterModule } from '@nestjs/core';
import { SubCategoryModule } from './sub-category/SubCategory.module';
import { AddressModule } from './address/address.module';
import { FilesModule } from './files/files.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyEntity]),
    RouterModule.register([
      {
        path: 'property',
        children: [
          {
            path: 'property',
            module: PropertyModule,
          },
          {
            path: 'division',
            module: DivisionModule,
          },
          {
            path: 'type',
            module: TypeModule,
          },
          {
            path: 'category',
            module: CategoryModule,
          },
          {
            path: 'sub-category',
            module: SubCategoryModule,
          },
          {
            path: 'address',
            module: AddressModule,
          },
          {
            path: 'file',
            module: FilesModule,
          }
        ],
      },
    ]),

    DivisionModule,
    TypeModule,
    CategoryModule,
    SubCategoryModule,
    AddressModule,
    FilesModule
  ],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyAbilityFactory, PropertyGuard,],
  exports: [PropertyService, PropertyAbilityFactory]
})
export class PropertyModule { }

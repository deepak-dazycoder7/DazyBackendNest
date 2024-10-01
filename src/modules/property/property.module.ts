import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/modules/property/entity/property.entity';
import { PropertyAbilityFactory } from 'src/modules/property/permission-abilities/property-ability.factory';
import { PropertyGuard } from '../property/guards/permission.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PropertyTypeModule } from './property-type/property-type.module';
import { DivisionModule } from './division/division.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Serve files at /uploads endpoint
    }),
    DivisionModule,
    PropertyTypeModule,
    CategoryModule
  ],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyAbilityFactory, PropertyGuard, ],
  exports: [PropertyService, PropertyAbilityFactory]
})
export class PropertyModule { }

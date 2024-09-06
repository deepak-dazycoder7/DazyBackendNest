import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/domain/property/entity/property.entity';
import { PropertyAbilityFactory } from 'src/domain/property/permission-abilities/property-ability.factory';
import { PropertyGuard } from '../property/guards/permission.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PropertyTypeEntity } from 'src/domain/property/property-type/entity/property-type.entity';
import { PropertyTypeService } from './property-type/property-type.service';
import { PropertyTypeModule } from './property-type/property-type.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([PropertyEntity, PropertyTypeEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Serve files at /uploads endpoint
    }),
PropertyTypeModule
],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyAbilityFactory, PropertyGuard, PropertyTypeService],
  exports: [PropertyService, PropertyAbilityFactory ] 
})
export class PropertyModule {}

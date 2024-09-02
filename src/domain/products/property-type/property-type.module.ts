import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyTypeEntity } from './entity/property-type.entity';
import { PropertyTypeService } from './property-type.service';
import { PropertyTypeController } from './property-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyTypeEntity])],
  providers: [PropertyTypeService],
  controllers: [PropertyTypeController],
  exports: [PropertyTypeService],
})
export class PropertyTypeModule {}

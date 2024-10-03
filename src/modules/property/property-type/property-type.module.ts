import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyTypeEntity } from './entity/property-type.entity';
import { TypeService } from './property-type.service';
import { TypeController } from './property-type.controller';
import { PropertyTypeAbilityFactory } from './permission-abilities/propertytype.ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyTypeEntity])],
  providers: [TypeService, PropertyTypeAbilityFactory],
  controllers: [TypeController],
  exports: [TypeService],
})
export class TypeModule {}

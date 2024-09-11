import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionEntity } from './entity/division.entity';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';
import { PropertyAbilityFactory } from '../permission-abilities/property-ability.factory';

@Module({
    imports: [TypeOrmModule.forFeature([DivisionEntity])],
    providers: [DivisionService, PropertyAbilityFactory],
    controllers: [DivisionController],
    exports: [DivisionService],
})
export class DivisionModule { }

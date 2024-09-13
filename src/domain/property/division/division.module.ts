import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionEntity } from './entity/division.entity';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';
import { DivisionAbilityFactory } from './permission-abilities/division.ability.factory';

@Module({
    imports: [TypeOrmModule.forFeature([DivisionEntity])],
    providers: [DivisionService, DivisionAbilityFactory ],
    controllers: [DivisionController],
    exports: [DivisionService],
})
export class DivisionModule { }

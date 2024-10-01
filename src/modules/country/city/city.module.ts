import { Module } from "@nestjs/common";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityEntity } from "./entity/city.entity";
import { CityRepository } from "./repository/city.repository";
import { CityAbilityFactory } from "./permission-ability/city.abiity.factory";
@Module({
    imports: [
        TypeOrmModule.forFeature([CityEntity]),
    ],
    controllers: [CityController],
    providers: [CityService, CityRepository, CityAbilityFactory],
    exports: [CityService,]
})
export class CityModule { }

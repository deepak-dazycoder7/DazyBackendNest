import { Module } from "@nestjs/common";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryEntity } from "./entity/country.entity";
import { CountryRepository } from "./repository/country.repository";
import { CountryAbilityFactory } from "./permission-abilities/country.ability.factory";
import { StateModule } from "./states/state.module";
import { CityModule } from "./city/city.module";
@Module({
    imports: [
        TypeOrmModule.forFeature([CountryEntity]),
        StateModule,
        CityModule
    ],
    controllers: [CountryController],
    providers: [CountryService, CountryRepository, CountryAbilityFactory],
    exports: [CountryService,]
})
export class CountryModule { }

import { Module } from "@nestjs/common";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryEntity } from "./entity/country.entity";
import { CountryRepository } from "./repository/country.repository";
import { CountryAbilityFactory } from "./permission-abilities/country.ability.factory";
import { StateModule } from "./states/state.module";
import { CityModule } from "./city/city.module";
import { RouterModule } from "@nestjs/core";
@Module({
    imports: [
        TypeOrmModule.forFeature([CountryEntity]),
        RouterModule.register([
            {
                path: 'country',
                children: [
                    {
                        path: 'state',
                        module: StateModule,
                    },
                    {
                        path: 'city',
                        module: CityModule,
                    },
                ],
            }
        ]),
        StateModule,
        CityModule
    ],
    controllers: [CountryController],
    providers: [CountryService, CountryRepository, CountryAbilityFactory],
    exports: [CountryService,]
})
export class CountryModule { }

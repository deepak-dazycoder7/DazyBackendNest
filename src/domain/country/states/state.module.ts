import { Module } from "@nestjs/common";
import { StateController } from "./state.controller";
import { StateService } from "./state.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StateEntity } from "./entity/state.entity";
import { StateRepository } from "./repository/state.repositiory";
import { StateAbilityFactory } from "./permission-abilities/state.ability.factory";

@Module({
    imports: [
        TypeOrmModule.forFeature([StateEntity]),
    ],
    controllers: [StateController],
    providers: [StateService, StateRepository, StateAbilityFactory ],
    exports: [StateService,]
})
export class StateModule { }

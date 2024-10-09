import { Module } from "@nestjs/common";
import { AddressController } from "./Address.controller";
import { AddressService } from "./Address.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressEntity } from "./entity/Address.entity";
import { AddressAbilityFactory } from "./permission-abilities/address.ability.factory";

@Module({
    imports: [TypeOrmModule.forFeature([AddressEntity])],
    controllers: [AddressController],
    providers: [AddressService, AddressAbilityFactory],
    exports: [AddressService]
})
export class AddressModule { }

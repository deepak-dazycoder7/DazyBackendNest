import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { UserRepository } from "src/repositories/user.repository";
import { UserAbilityFactory } from "src/casl/user-ability.factory";
import { UserRoleGuard } from "src/guards/role-permission.guard";
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [UsersService, UserRepository, UserAbilityFactory, UserRoleGuard ],
    exports: [UsersService, TypeOrmModule, UserAbilityFactory ]
  })
  export class UsersModule {}
  
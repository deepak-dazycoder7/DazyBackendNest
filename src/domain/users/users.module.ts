import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/domain/users/entity/user.entity";
import { UserRepository } from "./repository/user.repository";
import { UserAbilityFactory } from "src/domain/users/permission-abilities/user-ability.factory";
import { UserRoleGuard } from "./guards/role-permission.guard";
@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity]),
  ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository, UserAbilityFactory, UserRoleGuard ],
    exports: [UsersService, TypeOrmModule, UserAbilityFactory, UserRepository ]
  })
  export class UsersModule {}
  
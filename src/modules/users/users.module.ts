import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entities";
import { UserRepository } from "src/entity/user.repository";
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
    exports: [UsersService, TypeOrmModule]
  })
  export class UsersModule {}
  
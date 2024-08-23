import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { UserRepository } from "src/entity/user.repository";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory";
import { JwtAuthGuard } from "src/guards/jwt.auth.guard";
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [UsersService, UserRepository, CaslAbilityFactory ],
    exports: [UsersService, TypeOrmModule, CaslAbilityFactory ]
  })
  export class UsersModule {}
  
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonModule } from './common/common.module';
import { UserEntity } from './entity/user.entities';
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { HttpExceptionFilter } from "src/exceptionFilter/http-exception.filter";
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { RolesGuard } from './guards/roles.guards';
import { UserMiddleware } from './middlewares/app.middleware';
import { UserSeeder } from './modules/adminSeed/admin.seed';
import { JwtStrategy } from './jwtstrategy/jwt.strategy';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { CaslGuard } from './casl/casl.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABSE_NAME || 'dazynestdb',
      entities: [UserEntity],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [
    CaslAbilityFactory,
    { provide: APP_GUARD, useClass: CaslGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: RolesGuard, },
    UserSeeder,
    JwtStrategy,
    JwtAuthGuard
  ],
  exports: [JwtAuthGuard]
})
export class AppModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
  constructor(private readonly userSeeder: UserSeeder) { }

  async onModuleInit() {
    await this.userSeeder.onModuleInit();
  }
}

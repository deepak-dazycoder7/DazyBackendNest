import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UserEntity } from './entity/user.entity';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/exceptionFilter/http-exception.filter';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { LoggerMiddleware } from './middlewares/app.middleware';
import { UserSeeder } from './modules/adminSeed/admin.seed';
import { JwtStrategy } from './jwtstrategy/jwt.strategy';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { PoliciesGuard } from './casl/policy.guard';

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
      database: process.env.DATABASE_NAME || 'dazynestdb',
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
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    UserSeeder,
    JwtStrategy,
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  constructor(private readonly userSeeder: UserSeeder) {}
  async onModuleInit() {
    await this.userSeeder.onModuleInit();
  }
}

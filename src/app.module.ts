import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './modules/common/common.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/modules/common/exceptionFilter/http-exception.filter';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt.auth.guard';
import { LocaleMiddleware } from './modules/common/middlewares/app.middleware';
import { UserSeeder } from './infrastructure/adminSeed/admin.seed';
import { JwtStrategy } from './modules/common/jwtstrategy/jwt.strategy';
import { UserAbilityFactory } from './modules/users/permission-abilities/user-ability.factory';
import { DatabaseModule } from './infrastructure/Database infra/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    CommonModule,
    DatabaseModule,
    UsersModule,
  
  ],
  controllers: [],
  providers: [
    UserAbilityFactory,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    UserSeeder,
    JwtStrategy,
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LocaleMiddleware).forRoutes('*');
  }
  constructor(private readonly userSeeder: UserSeeder) { }
  async onModuleInit() {
    await this.userSeeder.onModuleInit();
  }
}

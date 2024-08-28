import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/domain/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './modules/common/common.module';
import { UserEntity } from './domain/users/entity/user.entity';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/modules/common/exceptionFilter/http-exception.filter';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt.auth.guard';
import { LoggerMiddleware } from './modules/common/middlewares/app.middleware';
import { UserSeeder } from './domain/adminSeed/admin.seed';
import { JwtStrategy } from './modules/common/jwtstrategy/jwt.strategy';
import { UserAbilityFactory } from './domain/users/permission-abilities/user-ability.factory';
import { ProductEntity } from './domain/products/entity/product.entity';
import { ProductModule } from './domain/products/products.module';

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
      entities: [UserEntity, ProductEntity],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CommonModule,
    ProductModule,
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
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  constructor(private readonly userSeeder: UserSeeder) { }
  async onModuleInit() {
    await this.userSeeder.onModuleInit();
  }
}

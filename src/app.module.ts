import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './modules/common/common.module';
import { UserEntity } from './modules/users/entity/user.entity';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/modules/common/exceptionFilter/http-exception.filter';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt.auth.guard';
import { LocaleMiddleware } from './modules/common/middlewares/app.middleware';
import { UserSeeder } from './infrastructure/adminSeed/admin.seed';
import { JwtStrategy } from './modules/common/jwtstrategy/jwt.strategy';
import { UserAbilityFactory } from './modules/users/permission-abilities/user-ability.factory';
import { PropertyEntity } from './modules/property/entity/property.entity';
import { PropertyModule } from './modules/property/property.module';
import { PropertyTypeEntity } from './modules/property/property-type/entity/property-type.entity';
import { MultiLangModule } from './modules/common/multi-language/multi-lang.module';
import { DivisionEntity } from './modules/property/division/entity/division.entity';
import { CategoryEntity } from './modules/property/category/entity/category.entity';
import { CountryModule } from './modules/country/country.module';
import { CountryEntity } from './modules/country/entity/country.entity';
import { StateEntity } from './modules/country/states/entity/state.entity';
import { CityEntity } from './modules/country/city/entity/city.entity';

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
      entities: [UserEntity, PropertyEntity, PropertyTypeEntity, DivisionEntity, CategoryEntity, CountryEntity, StateEntity, CityEntity],
      synchronize: true,
      //logging: true,
    }),

    AuthModule,
    UsersModule,
    MultiLangModule,
    CommonModule,
    PropertyModule,
    CountryModule
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

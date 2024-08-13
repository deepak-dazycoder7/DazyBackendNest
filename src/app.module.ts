import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule} from '@nestjs/typeorm'
import { CommonModule } from './common/common.module';
import { UserEntity } from './entity/user.entities';
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "src/exceptionFilter/http-exception.filter";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST ||'localhost',
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABSE_NAME || 'dazynestdb',
      entities: [UserEntity],
      synchronize: true,
    }),
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot(),
    CommonModule,
  ],
  controllers: [],
  providers: [ { provide: APP_FILTER, useClass: AllExceptionsFilter },],
})
export class AppModule {}

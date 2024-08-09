import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthSerivice } from './auth.service';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthSerivice],
})
export class AuthModule {}

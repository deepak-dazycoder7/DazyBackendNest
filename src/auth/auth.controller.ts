import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthSerivice } from './auth.service';
import { SignInDto } from './dtos/auth.signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice : AuthSerivice){}

  @Post('sign-in')
    async SingIn(@Body() signinData : SignInDto){
        
    }
}
import { Body, Controller, Post, UnauthorizedException, Inject, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../../dtos/auth.signIn.dto';
import { Public } from 'src/decorators/publice.decorator';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('CREATE_RESPONSE') private readonly returnResponse,
  ) { }

  @Post('sign-in')
  @Public()
  async login(@Body() signinDto: SignInDto): Promise<any> {
    try {
      const user = await this.authService.SignIn(signinDto);
      const token = await this.authService.generateToken(user);

      const { password, ...sanitizedUser } = user;

      return this.returnResponse('User signed in successfully', 201, { user: sanitizedUser, token });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return this.returnResponse(error.message, 401, null);
      }
      throw error;
    }
  }

  //sign out
  // @Post('signout')
  // async signOut(@Req() req: Request): Promise<any> {
  //   const token = req.headers.authorization?.split(' ')[1];
  //   try {
  //     await this.authService.signOut(token);
  //     return this.returnResponse('Sing-Out Successfully', 201, null)
  //   } catch (error) {
  //     return this.returnResponse(error.message, 400, null);
  //   }
  // }

}

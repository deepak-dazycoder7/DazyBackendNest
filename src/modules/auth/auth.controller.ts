import { Body, Controller, Post, UnauthorizedException, Inject, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.signIn.dto';
import { Public } from 'src/modules/common/decorators/publice.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('CREATE_RESPONSE') private readonly ResponseService 
  ) {}

  @Post('sign-in')
  @Public()
  async login(@Body() signinDto: SignInDto, @I18n() i18n: I18nContext): Promise<any> {
    try {
      const user = await this.authService.SignIn(signinDto);
      const token = await this.authService.generateToken(user);
      return this.ResponseService(i18n.t('message.signin_success'), 200, { user, token });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return this.ResponseService(error.message, 401, null);
      }
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

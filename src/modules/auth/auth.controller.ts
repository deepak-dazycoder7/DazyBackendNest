import { Body, Controller, Post, UnauthorizedException, Inject, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.signIn.dto';
import { Public } from 'src/modules/common/decorators/publice.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('CREATE_RESPONSE') private readonly ResponseService
  ) { }

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
  @Post('sign-out')
  @UseGuards(AuthGuard('jwt'))
  async signOut(@Req() req, @I18n() i18n: I18nContext) {
    try {
      const userId = await this.authService.getUserIdFromRequest(req);
      await this.authService.signOut(userId);
      return this.ResponseService(i18n.t('message.signout_success'), 200, null)
    } catch (error) {
      return this.ResponseService(error.message, 401, null);
    }
  }
}

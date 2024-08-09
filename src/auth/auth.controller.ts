import { Body, Controller, Post,UnauthorizedException, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/auth.signIn.dto';
import { ResponseDto } from "src/common/dtos/response.dto";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('CREATE_RESPONSE') private readonly createResponse
) {}

  @Post('sign-in')
  async login(@Body() signinDto: SignInDto): Promise<ResponseDto<any>> {
      try {
          const user = await this.authService.SignIn(signinDto);
          const token = await this.authService.generateToken(user);

          return this.createResponse('Login successful', 200, false, user, token);
      } catch (error) {
          if (error instanceof UnauthorizedException) {
      
              return this.createResponse('Login failed', 401, true, null, undefined, error.message);
          }
        
          throw error;
      }
  }
}
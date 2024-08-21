import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Inject,
  UseGuards,
  SetMetadata
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/auth.signIn.dto';
import { CaslGuard } from 'src/casl/casl.guard'; 
import { Public } from 'src/decorators/publice.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('CREATE_RESPONSE') private readonly returnResponse,
  ) {}

  @Public()
  @Post('sign-in')
  @UseGuards(CaslGuard)
  @SetMetadata('action', 'all')
  // @SetMetadata('subject', 'UserEntity')
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

}

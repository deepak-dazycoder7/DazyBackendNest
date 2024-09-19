import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { SignInDto } from './dto/auth.signIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/domain/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { UsersService } from 'src/domain/users/users.service';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly userService : UsersService,
    private readonly i18n: I18nService,
  ) { }

  // SignIn validation
  async SignIn(signinDto: SignInDto): Promise<UserEntity> {
    const { email, password } = signinDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      const errorMessage = this.i18n.t('errors.not_found.user', { lang: I18nContext.current().lang });
      throw new UnauthorizedException(errorMessage);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const errorMessage = this.i18n.t('errors.password_not_match', { lang: I18nContext.current().lang })
      throw new UnauthorizedException(errorMessage);
    }
    return user;
  }

  //Sign Out
  async getUserIdFromRequest(@Request() req): Promise<number> {
    const user = req.user; 
    return user.id; 
  }
  async signOut(userId: number): Promise<void> {
  }

  //TOKEN generate
  async generateToken(user: UserEntity): Promise<string> {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}

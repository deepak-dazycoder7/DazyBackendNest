import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/auth.signIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/domain/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { I18nService, I18nContext } from 'nestjs-i18n';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
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
  // async signOut(token: string): Promise<void> {
  //   if (token) {
  //     this.blacklistedTokens.add(token);
  //   } else {
  //     throw new Error('Token not found');
  //   }
  // }
  // isTokenBlacklisted(token: string): boolean {
  //   return this.blacklistedTokens.has(token);
  // }

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

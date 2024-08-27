import { Injectable, NotFoundException } from '@nestjs/common';
import { SignInDto } from '../../dtos/auth.signIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  //  private readonly blacklistedTokens: Set<string> = new Set()
  ) { }

  // SignIn validation
  async SignIn(signinDto: SignInDto): Promise<UserEntity> {
    const { email, password } = signinDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Password Does Not Match');
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

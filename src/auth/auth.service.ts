import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dtos/auth.signIn.dto';
import { UserEntity } from 'src/users/entity/user.entities';
import { UserRepository } from 'src/users/entity/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  //SignIn validation
  async SignIn(signinDto: SignInDto): Promise<UserEntity> {
    const { email, password } = signinDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

   // Generate a JWT token for the user
   async generateToken(user: UserEntity): Promise<string> {
    const payload = { email: user.email, sub: user.id }; 
    return this.jwtService.sign(payload);
}
}

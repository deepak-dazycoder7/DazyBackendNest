import { Injectable, NotFoundException } from '@nestjs/common';
import { SignInDto } from './dtos/auth.signIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entities';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

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
  

  // Generate a JWT token for the user
  async generateToken(user: UserEntity): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}

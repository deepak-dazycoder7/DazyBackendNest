import { NotFoundException, Injectable, ConflictException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/domain/users/entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UpdateUserProfileDto } from './dtos/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  //create user
  async  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('User already registered with this email');
    }
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  //update user
  async updateUserProfile(id: number, updateUserProfileDto: UpdateUserProfileDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id }});
    if (!user) {
      throw new NotFoundException('User not found');
    } 
    Object.assign(user, updateUserProfileDto);
    return await this.userRepository.save(user);
  }

  //remove user
  async removeUser(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User With Id ${id} Not Found`)
    }
    await this.userRepository.delete(id);
    return user;
  }

  //read user
  async getUserById(id: number) :Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id }});
    if(!user) {
      throw new NotFoundException(`User with id ${id} Not Found`)
    }
    return user;
  }

  async getAllUsers() : Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  // async findOneByEmail(email : string) : Promise<UserEntity> {
  //    const user = await this.userRepository.findOne({ where : { email }});
  //    if(!user) {
  //     throw new NotFoundException(`User with id ${email} Not Found`)
  //   }
  //   return user;
  // }
}


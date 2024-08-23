import { NotFoundException, Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entity/user.entity';
import { UserRepository } from 'src/entity/user.repository';
import { UpdateUserProfileDto } from './dtos/update.user.dto';
import { Action } from 'src/casl/action.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  //create user
  async createUser(createUserDto: CreateUserDto) {
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

    const { firstName, lastName, email, avtar, password } = updateUserProfileDto;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (avtar) user.avtar = avtar;
    if (password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
    }
    await this.userRepository.save(user);
    return user;
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
  async getOne(id: number) :Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id }});
    if(!user) {
      throw new NotFoundException(`User with id ${id} Not Found`)
    }
    return user;
  }

  async getAll() : Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async findOneByEmail(email : string) : Promise<UserEntity> {
     return await this.userRepository.findOne({ where : { email }});
  }
}


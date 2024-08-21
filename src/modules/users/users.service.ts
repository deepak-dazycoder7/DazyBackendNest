import { NotFoundException, Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entity/user.entities';
import { UserRepository } from 'src/entity/user.repository';
import { UpdateUserProfileDto } from './dtos/update.user.dto';
import { Action } from 'src/casl/action.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) { }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }


  findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  //create user
  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  //update user
  async updateUserProfile(userId: number, updateUserProfileDto: UpdateUserProfileDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });
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
      throw new NotFoundException(' user not found')
    }
    await this.userRepository.delete(id);
    return user;
  }
    // You can add CASL-specific checks here if needed
    async canReadAll(ability) {
      if (!ability.can(Action.Read, UserEntity)) {
        throw new ForbiddenException('user not read');
      }
      return this.findAll();
    }
  
    async canReadOne(id: number, ability) {
      const user = await this.findOne(id);
      if (!ability.can(Action.Read, user)) {
        throw new ForbiddenException('user not read');
      }
      return user;
    }
  }


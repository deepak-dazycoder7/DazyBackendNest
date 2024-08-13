import { Injectable, ConflictException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entity/user.entities';
import { UserRepository } from 'src/entity/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}


  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  
  findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  //create user
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity | null> {
      
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    if (existingUser) {
          throw  new ConflictException('User Are Allready Existed.');
    }
      // Create and save the new user
      const newUser = this.userRepository.create(createUserDto);
      newUser.password = await bcrypt.hash(createUserDto.password, 10);
      const savedUser = await this.userRepository.save(newUser);

      return savedUser;
  }
}

  //update user


  //delete user by Id
//   async remove(id: number): Promise<UserEntity> {
//     const deleteruslt = await this.userRepository.delete(id);

//     if (deleteruslt.affected === 1) {
//       return 'User is deleted successfully';
//     } else {
//       throw new Error('User Is not found or could not be deleted');
//     }
//   }
// }

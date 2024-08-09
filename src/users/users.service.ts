import { Injectable, HttpStatus } from '@nestjs/common';
import { UserEntity } from './entity/user.entities';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';
//import { ApiResponse } from 'src/common/response.interface';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './entity/user.repository';

@Injectable()
export class UsersService {
  constructor(

    private userRepository: UserRepository
  ) { }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // // //create user
  // // async createUser(createUserDto: CreateUserDto): Promise<ApiResponse<UserEntity | null>> {
  // //   try {
  // //     // Check if user with the same email already exists
  // //     const existingUser = await this.userRepository.findOne({
  // //       where: { email: createUserDto.email },
  // //     });
  // //     if (existingUser) {
  // //       return {
  // //         message: 'User with this email already exists.',
  // //         status: HttpStatus.BAD_REQUEST,
  // //         error: true,
  // //         data: null,
  // //       };
  // //     }

  //     // Create and save the new user
  //     const newUser = this.userRepository.create(createUserDto);
  //     newUser.password = await bcrypt.hash(createUserDto.password, 10);
  //     const savedUser = await this.userRepository.save(newUser);

  //     return {
  //       message: 'User Successfully Created',
  //       status: HttpStatus.CREATED,
  //       error: false,
  //       data:{
  //         "user" : savedUser,
  //       } 

  //     };
  //   } catch (error) {
  //     return {
  //       message: 'Error Creating User',
  //       status: HttpStatus.INTERNAL_SERVER_ERROR,
  //       error: true,
  //       errorMessage: error.message,
  //       data: null,
  //     };
  //   }
  // }

  //update user


  //delete user by Id
  async remove(id: number): Promise<string> {
    const deleteruslt = await this.userRepository.delete(id);

    if (deleteruslt.affected === 1) {
      return 'User is deleted successfully';
    } else {
      throw new Error('User Is not found or could not be deleted');
    }
  }
}

import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entity/user.entities';
import { UserRepository } from 'src/entity/user.repository';
import { UpdateUserDto } from './dtos/update.user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}


  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  
  findByID(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({where : {id}});
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
  async updateProfile(userId: number, updateProfileDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateProfileDto.password) {
      updateProfileDto.password = await bcrypt.hash(updateProfileDto.password, 10);
    }

    Object.assign(user, updateProfileDto);

    return this.userRepository.save(user);
  }
}
    
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

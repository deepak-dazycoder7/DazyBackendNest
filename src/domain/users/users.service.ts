import { NotFoundException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/domain/users/entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UpdateUserProfileDto } from './dtos/update.user.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly i18n: I18nService,
  ) {}

  //create 
  async  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  //update 
  async updateUserProfile(id: number, updateUserProfileDto: UpdateUserProfileDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserProfileDto);
    return this.userRepository.findOne({ where: { id } });
  }

  //remove 
  async removeUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  //read 
  async getUserById(id: number) :Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id }});
    if(!user) {
      const errorMessage = this.i18n.t('errors.not_found.user', {lang : I18nContext.current().lang})
      throw new NotFoundException(errorMessage)
    }
    return user;
  }
  //read all 
  async getAllUsers() : Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users || users.length === 0) {
      const errorMessage = this.i18n.t('errors.not_found.user', {lang : I18nContext.current().lang})
      throw new NotFoundException(errorMessage);
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


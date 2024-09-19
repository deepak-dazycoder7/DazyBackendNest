import { NotFoundException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/domain/users/entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UpdateUserProfileDto } from './dtos/update.user.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly i18n: I18nService,
    private readonly datasource: DataSource
  ) {}

  //create 
  async  createUser(createUserDto: CreateUserDto, userId: number): Promise<UserEntity> {
    const newUser = this.userRepository.create({...createUserDto, created_by: userId});
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.userRepository.save(newUser);
  
  }

  //update 
  async updateUserProfile(id: number, updateUserProfileDto: UpdateUserProfileDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserProfileDto);
    return this.userRepository.findOne({ where: { id } });
  }

  //remove 
  async softDeleteUser(id: number, deleted_by: number): Promise<void> {
    await this.datasource
      .getRepository(UserEntity)
      .createQueryBuilder()
      .update(UserEntity)
      .set({ deleted_at: new Date(), deleted_by: deleted_by })  
      .where("id = :id", { id })
      .execute();
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

}


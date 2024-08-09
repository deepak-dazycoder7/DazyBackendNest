import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entities";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create.user.dto";
import { promises } from "readline";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepository : Repository<UserEntity>,
    ){}

    findAll(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }

    findOne(id: number): Promise<UserEntity | null >{
        return this.userRepository.findOneBy({id});
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }
    

    async remove(id: number) : Promise<string>{
      const deleteruslt =  await this.userRepository.delete(id);

      if(deleteruslt.affected === 1){
        return 'User is deleted successfully'
      }else {
        throw new Error('User Is not found or could not be deleted')
      }
    }
}
import { Body, Controller, Post, Inject, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from 'src/entity/user.entities';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        @Inject('CREATE_RESPONSE') private readonly createResponse
    ) {}
    

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
        const user = await this.usersService.createUser(createUserDto);
        return this.createResponse('Create User Successfully',200,user);

    } catch (error) {
        if (error instanceof UnauthorizedException) {
            return this.createResponse(error.message, 401,null);
        }
    }
} 

//     @Delete('delete/:id')
//     async remove(@Param('id') id: number): Promise<string> {
//         return this.usersService.remove(id);
//     }
 }

import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
//import { ApiResponse } from '../common/utils/response.util';
import { UserEntity } from './entity/user.entities';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @Post('create')
    // async createUser(
    //     @Body() createUserDto: CreateUserDto,
    // ): Promise<ApiResponse<UserEntity | null>> {
    //     const response = await this.usersService.createUser(createUserDto);
    //     return response;
    // }

    @Delete('delete/:id')
    async remove(@Param('id') id: number): Promise<string> {
        return this.usersService.remove(id);
    }
}

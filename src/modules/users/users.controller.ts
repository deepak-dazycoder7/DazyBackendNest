import { Body, Controller, Post, Inject, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from 'src/entity/user.entities';
import { Public } from 'src/decorators/publice.decorator';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        @Inject('CREATE_RESPONSE') private readonly returnResponse
    ) { }

    @Public()
    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            const existingUser = await this.usersService.findOneByEmail(createUserDto.email);
            if (existingUser) {
                return this.returnResponse('User already registered with this email', 401, null
                );
            }
            const user = await this.usersService.createUser(createUserDto);
            const {password, ...resultUser} = user;
            return this.returnResponse('Create User Successfully', 200, resultUser);

        } catch (error) {
            if (error instanceof UnauthorizedException) {
                return this.returnResponse(error.message, 401, null);
            }
        }
    }

    //update user 

    //     @Delete('delete/:id')
    //     async remove(@Param('id') id: number): Promise<string> {
    //         return this.usersService.remove(id);
    //     }
}

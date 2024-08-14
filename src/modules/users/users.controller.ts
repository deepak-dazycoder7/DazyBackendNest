import { Body, Controller, Post, Inject, UnauthorizedException, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from 'src/entity/user.entities';
import { UpdateUserProfileDto } from './dtos/update.user.dto';
import { Public } from 'src/decorators/publice.decorator';



@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        @Inject('CREATE_RESPONSE') private readonly returnResponse
    ) { }


    //create user
    @Public()
    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            const existingUser = await this.usersService.findOneByEmail(createUserDto.email);
            if (existingUser) {
                return this.returnResponse('User already registered with this email', 401);
            }
            const user = await this.usersService.createUser(createUserDto);
            const { password, ...resultUser } = user;
            return this.returnResponse('Create User Successfully', 200, resultUser);

        } catch (error) {
            if (error instanceof UnauthorizedException) {
                return this.returnResponse(error.message, 401, null);
            }
        }
    }

    //update user 
    @Put('profile/:id')
    async updateUserProfile(@Param('id') userId: number, @Body() updateUserProfileDto: UpdateUserProfileDto,): Promise<string> {
        try {
            const user = await this.usersService.updateUserProfile(userId, updateUserProfileDto);
            const { password, ...updatedUser } = user;
            return this.returnResponse('Profile updated successfully', 200, updatedUser);
        } catch (error) {
            return this.returnResponse(error.message, 401, null);
        }
    }

    //remove user
    @Delete('remove/:id')
    async removeUser(@Param('id') id: number,): Promise<string> {
        try {
            await this.usersService.removeUser(id);
            return new this.returnResponse(`User Id ${id} has been deleted`, 200, null)
        } catch (error) {
            return this.returnResponse(error.message, 400, null)
        }
    }
}

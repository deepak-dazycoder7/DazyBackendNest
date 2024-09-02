import {Body, Controller, Post, Put, Param, Delete, Inject, Get, UseGuards, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserProfileDto } from './dtos/update.user.dto';
import { SetMetadata } from '@nestjs/common';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreatePolicyHandler, DeletePolicyHandler, ReadPolicyHandler, UpdatePolicyHandler } from 'src/domain/users/permission-abilities/user.policy';
import { UserRoleGuard } from './guards/role-permission.guard';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt.auth.guard';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';

@Controller('users')
@UseGuards(UserRoleGuard, JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('CREATE_RESPONSE') private readonly returnResponse
  ) { }

  //create user
  @Post('create')
  @UseFilters(new I18nValidationExceptionFilter())
  @SetMetadata(CHECK_POLICIES_KEY, [new CreatePolicyHandler()])
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    try {
      const user = await this.usersService.createUser(createUserDto);
      const { password, ...userCreate } = user;
      return this.returnResponse('User Created Successfully', 200, userCreate);
    } catch (error) {
      return this.returnResponse(error.message, 400, null);
    }
  }

  //update user
  @Put('profile/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new UpdatePolicyHandler])
  async updateUserProfile(@Param('id') id: number, @Body() updateUserProfileDto: UpdateUserProfileDto): Promise<string> {
    try {
      const user = await this.usersService.updateUserProfile(id, updateUserProfileDto);
      const { password, ...userUpdate } = user
      return this.returnResponse('Profile Updated Successfully', 200, userUpdate);
    } catch (error) {
      return this.returnResponse(error.message, 400, null);
    }
  }

  // delete user
  @Delete('remove/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new DeletePolicyHandler()])
  async removeUser(@Param('id') id: number): Promise<string> {
    try {
      await this.usersService.removeUser(id);
      return this.returnResponse(`User Id ${id} Has Been Deleted`, 200, null);
    } catch (error) {
      return this.returnResponse(error.message, 400, null);
    }
  }

  // Get/read users
  @Get('/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadPolicyHandler()])
  async getOne(@Param('id') id: number): Promise<string> {
    try {
      const user = await this.usersService.getUserById(id);
      const { password, ...getUser} = user;
      return this.returnResponse(`User Id ${id} Fetched Successfully`, 200, getUser)
    } catch (error) {
      return this.returnResponse(error.message, 400, null)
    }
  }

  @Get()
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadPolicyHandler()])
  async getAll(): Promise<string> {
    try {
      const users = await this.usersService.getAllUsers();
      const getUsers = users.map(({password, ...user}) => user)
      return this.returnResponse('All Users Fetched Successfully', 200, getUsers);
    } catch (error) {
      return this.returnResponse(error.message, 400, null)
    }
  }
}


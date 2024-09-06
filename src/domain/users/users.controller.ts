import { Body, Controller, Post, Put, Param, Delete, Inject, Get, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserProfileDto } from './dtos/update.user.dto';
import { SetMetadata } from '@nestjs/common';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreatePolicyHandler, DeletePolicyHandler, ReadPolicyHandler, UpdatePolicyHandler } from 'src/domain/users/permission-abilities/user.policy';
import { UserRoleGuard } from './guards/role-permission.guard';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt.auth.guard';
import { I18nContext, I18n } from 'nestjs-i18n';
import { Entity } from 'typeorm';

@Controller('users')
@UseGuards(UserRoleGuard, JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('CREATE_RESPONSE') private readonly ResponseService
  ) {}

  //create user
  @Post('create')
  @SetMetadata(CHECK_POLICIES_KEY, [new CreatePolicyHandler()])
  async createUser(@Body() createUserDto: CreateUserDto, @I18n() i18n : I18nContext): Promise<string> {
    try {
      const user = await this.usersService.createUser(createUserDto);
      return this.ResponseService(i18n.t('message.success.create', {args: {entity :"User"}}), 200, user);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }

  //update user
  @Put('profile/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new UpdatePolicyHandler])
  async updateUserProfile(@Param('id') id: number, @Body() updateUserProfileDto: UpdateUserProfileDto, @I18n() i18n : I18nContext): Promise<string> {
    try {
      const user = await this.usersService.updateUserProfile(id, updateUserProfileDto);
      return this.ResponseService(i18n.t('message.update_success.user'), 200, user);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }

  // delete user
  @Delete('remove/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new DeletePolicyHandler()])
  async removeUser(@Param('id') id: number, @I18n() i18n : I18nContext): Promise<string> {
    try {
      await this.usersService.removeUser(id);
      return this.ResponseService(i18n.t('message.delete_success.user'), 200, null);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }

  // Get/read users
  @Get('/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadPolicyHandler()])
  async getOne(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<string> {
    try {
      const user = await this.usersService.getUserById(id);
      return this.ResponseService(i18n.t('message.fetch_success.user'), 200, user)
    } catch (error) {
      return this.ResponseService(error.message, 400, null)
    }
  }

  @Get()
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadPolicyHandler()])
  async getAll(@I18n() i18n : I18nContext): Promise<string> {
    try {
      const users = await this.usersService.getAllUsers();
      return this.ResponseService(i18n.t('message.fetch_success.user'), 200, users);
    } catch (error) {
      return this.ResponseService(error.message, 400, null)
    }
  }
}


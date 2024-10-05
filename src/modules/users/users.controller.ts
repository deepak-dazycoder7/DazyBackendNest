import { Body, Controller, Post, Put, Param, Delete, Inject, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserProfileDto } from './dtos/update.user.dto';
import { SetMetadata } from '@nestjs/common';
import { CHECK_POLICIES_KEY } from 'src/modules/common/decorators/policies.decorator';
import { CreatePolicyHandler, DeletePolicyHandler, ReadPolicyHandler, UpdatePolicyHandler } from 'src/modules/users/permission-abilities/user.policy';
import { UserRoleGuard } from './guards/role-permission.guard';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt.auth.guard';
import { I18nContext, I18n } from 'nestjs-i18n';
import { CustomRequest } from 'src/modules/common/interfaces/custom-request.interface';

@Controller('users')
@UseGuards(UserRoleGuard, JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('CREATE_RESPONSE') private readonly ResponseService
  ) { }

  //create
  @Post()
  @SetMetadata(CHECK_POLICIES_KEY, [new CreatePolicyHandler()])
  async createUser(@Body() createUserDto: CreateUserDto, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
    try {
      const createdBy = req.user?.sub
      const user = await this.usersService.createUser(createUserDto, createdBy);
      return this.ResponseService(i18n.t('message.success.create', { args: { entity: 'User' } }), 200, user);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }

  //update
  @Put(':id')
  @SetMetadata(CHECK_POLICIES_KEY, [new UpdatePolicyHandler])
  async updateUserProfile(@Param('id') id: number, @Body() updateUserProfileDto: UpdateUserProfileDto, @I18n() i18n: I18nContext): Promise<string> {
    try {
      const user = await this.usersService.updateUserProfile(id, updateUserProfileDto);
      return this.ResponseService(i18n.t('message.update_success.user'), 200, user);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }

  // delete 
  @Delete(':id')
  @SetMetadata(CHECK_POLICIES_KEY, [new DeletePolicyHandler()])
  async removeUser(@Param('id') id: number, @I18n() i18n: I18nContext, @Req() req: CustomRequest): Promise<string> {
    try {
      const deletedBy = req.user?.sub;
      await this.usersService.softDeleteUser(id, deletedBy);
      return this.ResponseService(i18n.t('message.delete_success.user'), 200, null);
    } catch (error) {
      return this.ResponseService(error.message, 400, null);
    }
  }

  // Get/read
  @Get(':id')
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadPolicyHandler()])
  async getOne(@Param('id') id: number, @I18n() i18n: I18nContext): Promise<string> {
    try {
      const user = await this.usersService.getUserById(id);
      return this.ResponseService(i18n.t('message.fetch_success.user'), 200, user)
    } catch (error) {
      return this.ResponseService(error.message, 400, null)
    }
  }
  //get all
  @Get()
  @SetMetadata(CHECK_POLICIES_KEY, [new ReadPolicyHandler()])
  async getAll(@I18n() i18n: I18nContext): Promise<string> {
    try {
      const users = await this.usersService.getAllUsers();
      return this.ResponseService(i18n.t('message.fetch_success.user'), 200, users);
    } catch (error) {
      return this.ResponseService(error.message, 400, null)
    }
  }
}


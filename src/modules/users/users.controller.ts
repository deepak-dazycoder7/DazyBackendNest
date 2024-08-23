import {
  Body,
  Controller,
  Post,
  Put,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserProfileDto } from './dtos/update.user.dto';
import { UserEntity } from 'src/entity/user.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';
import { CHECK_POLICIES_KEY } from 'src/casl/policies.decorator';
import { CreatePolicyHandler, DeletePolicyHandler } from 'src/casl/user.policy';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    @Inject('CREATE_RESPONSE') private readonly returnResponse
  ) { }

  @Post('create')
  @SetMetadata(CHECK_POLICIES_KEY, [new CreatePolicyHandler()])
  async createUser(@Body() createUserDto: CreateUserDto, req: Request): Promise<UserEntity> {
    try {
      const existingUser = await this.usersService.findOneByEmail(createUserDto.email);
      if (existingUser) {
        return this.returnResponse('User already registered with this email', 401);
      }
      const user = await this.usersService.createUser(createUserDto);
      const { password, ...resultUser } = user;
      return this.returnResponse('User Created Successfully', 200, resultUser);
    } catch (error) {
      return this.returnResponse(error.message, 401, null);
    }
  }

  @Put('profile/:id')
  async updateUserProfile(@Param('id') userId: number, @Body() updateUserProfileDto: UpdateUserProfileDto): Promise<string> {
    try {
      const user = await this.usersService.updateUserProfile(userId, updateUserProfileDto);
      const { password, ...updatedUser } = user;
      return this.returnResponse('Profile Updated Successfully', 200, updatedUser);
    } catch (error) {
      return this.returnResponse(error.message, 403, null);
    }
  }

  // delete user
  @Delete('remove/:id')
  @SetMetadata(CHECK_POLICIES_KEY, [new DeletePolicyHandler()])
  async removeUser(@Param('id') id: number): Promise<string> {
    try {
      await this.usersService.removeUser(id);
      return this.returnResponse(`User Id ${id} has been deleted`, 200, null);
    } catch (error) {
      return this.returnResponse(error.message, 403, null);
    }
  }


  // @Get()
  // async findAll(@Request() req): Promise<any> {
  //   const ability = req.ability; 
  //   return this.usersService.canReadAll(ability);
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: number, @Request() req): Promise<any> {
  //   const ability = req.ability; 
  //   return this.usersService.canReadOne(id, ability);
  // }
}


import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create.user.dto";
import { Response } from "express";
import { ApiResponse } from '../common/dto/apiResponse.interface'

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<void> {
        try {
            const user = await this.usersService.createUser(createUserDto);

            const response : ApiResponse <typeof user> = {
                message : 'User Successfully Created',
                status : HttpStatus.CREATED,
                data : user,
                error : false
            }
            res.status(HttpStatus.CREATED).json(response)

        } catch (error) {
            const response : ApiResponse<null> ={
                message : 'Error Creating User',
                status : HttpStatus.BAD_REQUEST,
                error : true,
                errorMessage : error.message
            }

            res.status(HttpStatus.BAD_REQUEST).json(response)
        }
    }
}


/// hash password save karwane hai ye sara logic user.service me le jana hai user controll ko clean rkhna hai and profile ka response k liye bhaiya e puchkar response krwana hai

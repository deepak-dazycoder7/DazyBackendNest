import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[0-9])(?=.*[@#$%^&*])[a-zA-Z0-9@#$%^&*]{6,}$/, {
    message: 'Password must be at least 6 characters long and contain at least one number and one special character',
  })
  password: string;

  @IsString()
  @IsOptional() 
  avtar?: string;
}

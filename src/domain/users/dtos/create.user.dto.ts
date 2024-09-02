import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail({}, { message: i18nValidationMessage('validation.isEmail') })
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[0-9])(?=.*[@#$%^&*])[a-zA-Z0-9@#$%^&*]{6,}$/, {
    message: 'Password must be at least 6 characters long and contain at least one number and one special character',
  })
  password: string;

  @IsString({})
  @IsNotEmpty({message : 'Define your role'})
  role: string;

  @IsString()
  @IsOptional() 
  avtar?: string;
}

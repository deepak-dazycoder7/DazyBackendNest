import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  firstName: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  lastName: string;

  @IsEmail({}, { message: i18nValidationMessage('validation.isEmail') })
  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  email: string;

  @IsString({ message: i18nValidationMessage('validation.passwordIsString') })
  @MinLength(6, { message: i18nValidationMessage('validation.passwordMinLength') })
  @Matches(/^(?=.*[0-9])(?=.*[@#$%^&*])[a-zA-Z0-9@#$%^&*]{6,}$/, {
    message: i18nValidationMessage('validation.passwordMatches'),
  })
  password: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.roleIsNotEmpty') })
  role: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsOptional() 
  avtar?: string;
}

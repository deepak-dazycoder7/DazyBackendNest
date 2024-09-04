import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SignInDto {
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
}

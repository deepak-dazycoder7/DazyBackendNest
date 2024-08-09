import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Invalid Email Format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[0-9])(?=.*[@#$%^&*])[0-9a-zA-Z@#$%^&*]{6,}$/, {
    message: 'Password must contain at least one number and one special character',
  })
  password: string;
}

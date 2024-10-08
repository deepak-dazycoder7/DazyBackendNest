import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsPostalCode,
    Length,
  } from 'class-validator';
  import { i18nValidationMessage } from 'nestjs-i18n';
  
  export class CreateAddressDto {
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    country_id: number;
  
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    state_id: number;
  
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    city_id: number;
  
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    @Length(1, 150, { message: i18nValidationMessage('validation.length') })
    address: string;
  
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsOptional() 
    @Length(0, 130, { message: i18nValidationMessage('validation.length') })
    landmark: string | null;
  
    @IsPostalCode('any')
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    zipCode: string;
  
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    latitude: string;
  
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    longitude: string;
  }
  
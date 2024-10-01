import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber, IsDate, IsArray, IsPostalCode } from 'class-validator';
import { Type } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreatePropertyDto {
  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  property_name: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  description: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsNumber({},{ message: i18nValidationMessage('validation.isNumber') })
  price: number;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  location: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsNumber({},{ message: i18nValidationMessage('validation.isNumber') })
  propertyTypeId: number; 

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean = true;

  @IsArray()
  @IsOptional()
  amenities?: string[];

  @IsOptional()
  @IsDate()
  @Type(() => Date)  // Ensure date is converted correctly
  availableFrom?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)  // Ensure date is converted correctly
  availableTo?: Date;

  // Address fields
  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  street: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  city: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  state: string;

  // Updated zipCode to string as per @IsPostalCode requirement
  @IsPostalCode('any')
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  zipCode: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  country: string;
}

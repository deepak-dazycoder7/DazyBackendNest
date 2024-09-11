import { IsString, IsDecimal, IsBoolean, IsOptional, IsEnum, IsDate, IsArray, IsUrl, IsPostalCode, IsNumber } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class UpdatePropertyDto {
  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsOptional()
  property_name?: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsOptional()
  @IsNumber({},{ message: i18nValidationMessage('validation.isNumber') })
  price?: number;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsOptional()
  location?: string;

  @IsEnum(['room', 'house'])
  @IsOptional()
  propertyType?: 'room' | 'house';

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsArray()
  @IsOptional()
  amenities?: string[];

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsDate()
  @IsOptional()
  availableFrom?: Date;

  @IsDate()
  @IsOptional()
  availableTo?: Date;

  // Address fields
  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsOptional()
  street?: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsOptional()
  city?: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsOptional()
  state?: string;

  @IsPostalCode('any')
  @IsOptional()
  zipCode?: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsOptional()
  country?: string;
}

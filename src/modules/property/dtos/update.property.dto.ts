import { IsString, IsDecimal, IsBoolean, IsOptional, IsEnum, IsDate, IsArray, IsUrl, IsPostalCode, IsNumber } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class UpdatePropertyDto {
  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsOptional()
  property_title?: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsOptional()
  @IsNumber({},{ message: i18nValidationMessage('validation.isNumber') })
  price?: number;

  @IsArray()
  @IsOptional()
  amenities?: string[];

}

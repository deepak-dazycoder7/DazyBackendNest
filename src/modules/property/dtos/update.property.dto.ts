import { IsString, IsDecimal, IsOptional, IsArray, IsNumber } from 'class-validator';
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

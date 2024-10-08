import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber, IsArray,  } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreatePropertyDto {
  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  property_title: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  description: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.isNumber') })
  price: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean = true;

  @IsArray()
  @IsOptional()
  amenities?: string[];

}

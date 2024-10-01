import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateCityDto {
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    city_name: string;
}
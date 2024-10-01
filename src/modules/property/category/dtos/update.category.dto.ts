import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdateCategoryDto {
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    category_name: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsOptional()
    description: string;
}
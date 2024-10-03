import { IsString, IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class SubCategoryDto {
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    sub_category_name: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    description: string;
}
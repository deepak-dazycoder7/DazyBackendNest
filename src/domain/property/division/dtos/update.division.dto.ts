import { IsString, IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdateDivisionDto {
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    name: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    description: string;
}
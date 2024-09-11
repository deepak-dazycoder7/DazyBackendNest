import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateDivisionDto {
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    division_name: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsOptional()
    description: string;
}
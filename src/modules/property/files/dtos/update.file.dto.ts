import { IsNotEmpty, IsOptional, IsString, IsUrl, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateFileDto {
    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    @IsOptional()
    file_name: string;

    @IsUrl()
    @IsOptional()
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    url: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    @IsOptional()
    description: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    @IsOptional()
    @Matches(/(image|video|document)/, {
        message: 'type must be either image, video, or document',
    })
    type: string;

    @IsString({ message: i18nValidationMessage('validation.isString') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
    @IsOptional()
    @Matches(/\b(jpg|jpeg|png|gif|mp4|avi|mkv|pdf|doc|docx)\b/, {
        message:
            'Invalid format. Accepted formats are: jpg, jpeg, png, gif, mp4, avi, mkv, pdf, doc, docx',
    })
    format: string;
}

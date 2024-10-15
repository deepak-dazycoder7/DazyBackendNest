import { IsNotEmpty, IsNumber, IsString, IsUrl, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n'

export class CreateFileDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  file_name: string;

  // @IsUrl(undefined, { message: 'Company URL is not valid.' })
  // @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  url: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  description: string;

  // @IsString({ message: i18nValidationMessage('validation.isString') })
  //  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @Matches(/(image|video|document)/, {
      message: 'type must be either image, video, or document',
  })
  type: string;

  //@IsString({ message: i18nValidationMessage('validation.isString') })
  // @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @Matches(/\b(jpg|jpeg|png|gif|mp4|avi|mkv|pdf|doc|docx)\b/, {
      message:
          'Invalid format. Accepted formats are: jpg, jpeg, png, gif, mp4, avi, mkv, pdf, doc, docx',
  })
  format: string;
}

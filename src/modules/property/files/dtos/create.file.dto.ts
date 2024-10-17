import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n'

export class CreateFileDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  file_name: string;

  url: string;

  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  description: string;

  // @Matches(/(image|video|document)/, {
  //   message: 'type must be either image, video, or document',
  // })
  type: string;

  // @Matches(/\b(jpg|jpeg|png|mp4|avi|mkv|mov|pdf|doc|docx)\b/, {
  //   message:
  //     'Invalid format. Accepted formats are: jpg, jpeg, png, mp4, avi, mkv, mov, pdf, doc, docx',
  // })
  format: string;

  property_id: number;

  category: string;

  subCategory: string
}

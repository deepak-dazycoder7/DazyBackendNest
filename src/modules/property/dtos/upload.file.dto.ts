import { IsString, IsEmpty } from 'class-validator';

export class UploadFileDto {
  @IsString()
  property_file_name: string;

  @IsString()
  description: string;

  @IsEmpty({message: 'one image required'})
  images?: string[];

  @IsEmpty({message: 'one image required'})
  videos?: string[];
}

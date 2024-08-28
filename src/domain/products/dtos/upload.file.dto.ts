// src/products/dto/upload-file.dto.ts
import { IsString, IsOptional, IsArray, ArrayMaxSize, IsEmpty } from 'class-validator';

export class UploadFileDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEmpty({message: 'one image required'})
  images?: string[];

  @IsEmpty({message: 'one image required'})
  videos?: string[];
}

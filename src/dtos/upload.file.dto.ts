// src/products/dto/upload-file.dto.ts
import { IsString, IsOptional, IsArray, ArrayMaxSize } from 'class-validator';

export class UploadFileDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  videos?: string[];
}

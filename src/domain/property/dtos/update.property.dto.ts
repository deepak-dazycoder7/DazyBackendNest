import { IsString, IsDecimal, IsBoolean, IsOptional, IsEnum, IsDate, IsArray, IsUrl, IsPostalCode } from 'class-validator';

export class UpdatePropertyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(['room', 'house'])
  @IsOptional()
  propertyType?: 'room' | 'house';

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsArray()
  @IsOptional()
  amenities?: string[];

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsDate()
  @IsOptional()
  availableFrom?: Date;

  @IsDate()
  @IsOptional()
  availableTo?: Date;

  // Address fields
  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsPostalCode('any')
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  country?: string;
}

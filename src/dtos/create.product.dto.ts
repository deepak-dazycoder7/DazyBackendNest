import { IsString, IsNotEmpty, IsBoolean, IsOptional,  IsEnum, IsDate, IsArray, IsUrl, IsPostalCode } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(['room', 'house'])
  @IsOptional()
  propertyType?: 'room' | 'house' = 'room';

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean = true;

  @IsArray()
  @IsOptional()
  amenities?: string[];

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)  // Ensure this is here to convert string to Date
  availableFrom?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)  // Ensure this is here as well
  availableTo?: Date;
  // Address fields
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsPostalCode('any')
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

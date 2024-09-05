import { IsString, IsNotEmpty } from "class-validator";

export class CreatePropertyTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
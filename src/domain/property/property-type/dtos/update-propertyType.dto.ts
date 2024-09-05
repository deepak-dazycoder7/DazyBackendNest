import { IsString, IsNotEmpty } from "class-validator";

export class UpdatePropertyTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
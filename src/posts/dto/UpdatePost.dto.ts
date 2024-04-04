import {IsOptional, IsString, MaxLength} from "class-validator"

export class UpdatePostDto{
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    textContent?:string
}
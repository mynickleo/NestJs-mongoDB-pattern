import {IsString, IsNotEmpty, MaxLength} from "class-validator"

export class CreatePostDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    contentText: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
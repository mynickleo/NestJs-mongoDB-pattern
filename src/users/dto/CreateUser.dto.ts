import { IsNotEmpty, IsString, IsOptional, ValidateNested } from "class-validator";
import { CreateUserSettingsDto } from "./CreateUserSettings.dto";
import { Type } from "class-transformer";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @IsOptional()
    displayName?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUserSettingsDto)
    settings?: CreateUserSettingsDto;
}
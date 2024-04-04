import {IsOptional, IsBoolean} from "class-validator"

export class CreateUserSettingsDto{
    @IsOptional()
    @IsBoolean()
    receiveNotifications?: boolean;

    @IsOptional()
    @IsBoolean()
    receiveEmails?: boolean;

    @IsOptional()
    @IsBoolean()
    receiveSMS?: boolean;
}
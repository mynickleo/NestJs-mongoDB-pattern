import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserSettings, UserSettingsSchema } from "src/schemas/UserSetting.schema";
import UserSettingsService from "./usersSettings.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
            {
                name: UserSettings.name,
                schema: UserSettingsSchema,
            }
    ])
    ],
    providers: [
        UsersService, UserSettingsService
    ],
    controllers: [UsersController]
})
export class UserModule {}
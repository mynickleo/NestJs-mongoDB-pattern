import { Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose"
import { Model } from "mongoose";
import { UserSettings } from "../schemas/UserSetting.schema";
import { CreateUserSettingsDto } from "./dto/CreateUserSettings.dto";

@Injectable()
export default class UserSettingsService{
    constructor(@InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>){}

    createUserSetting(settings: CreateUserSettingsDto){
        const newSettings = new this.userSettingsModel(settings);
        return newSettings.save();
    }

    getUserSettingById(id: string){
        return this.userSettingsModel.findById(id);
    }
}
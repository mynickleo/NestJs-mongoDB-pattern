import { Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose"
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import UserSettingsService from "./usersSettings.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
    private readonly userSettingsService: UserSettingsService){}

    async createUser({settings, ...createUserDto}: CreateUserDto){
        if(settings){
            const savedNewSettings = await this.userSettingsService.createUserSetting(settings)
            
            const newUser = new this.userModel({
                ...createUserDto,
                settings: savedNewSettings._id,
            });
            return newUser.save();
        }
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    getUsers(){
        return this.userModel.find();
    }

    getUserById(id: string){
        return this.userModel.findById(id).populate(["settings", "posts"]);
    }

    updateUserById(id: string, updateUserDto: UpdateUserDto){
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
    }

    deleteUserById(id: string){
        return this.userModel.findByIdAndDelete(id);
    }
}
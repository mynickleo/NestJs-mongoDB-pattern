import { Body, Controller, Post, Get, Param, HttpException, Patch, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Controller('users')
export class UsersController{
    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() creaateUserDto: CreateUserDto){
        return this.userService.createUser(creaateUserDto);  
    }

    @Get()
    getUsers(){
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("Invalid ID", 404);

        const findUser = await this.userService.getUserById(id);
        console.log(findUser)
        if(!findUser) throw new HttpException("User not found", 404);
        return findUser;
    }

    @Patch(':id')
    async updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("Invalid ID", 404);

        const updatedUser = await this.userService.updateUserById(id, updateUserDto);
        if(!updatedUser) throw new HttpException("User not found", 404);
        return updatedUser;
    }

    @Delete(':id')
    async deleteUserById(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("Ivalid ID", 404);
        
        const deletedUser = await this.userService.deleteUserById(id);
        if(!deletedUser) throw new HttpException("User not found", 404);
        return;
    }
}
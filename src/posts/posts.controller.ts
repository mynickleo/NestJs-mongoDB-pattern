import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from "@nestjs/common";
import { CreatePostDto } from "./dto/CreatePost.dto";
import { PostsService } from "./posts.service";
import mongoose from "mongoose";
import { UpdatePostDto } from "./dto/UpdatePost.dto";

@Controller('posts')
export class PostsController{
    constructor(private postsService: PostsService){}

    @Post()
    createPost(@Body() createPostDto: CreatePostDto){
        return this.postsService.createPost(createPostDto);
    }

    @Get()
    getUsers(){
        return this.postsService.getPosts();
    }

    @Get(':id')
    async getPostById(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("Invalid ID", 404);

        const findPost = await this.postsService.getPostById(id);
        if(!findPost) throw new HttpException("Post not found", 404);
        return findPost;
    }

    @Patch(':id')
    async updatePostById(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("Invalid ID", 404);

        const updatedPost = await this.postsService.updatePostById(id, updatePostDto);
        if(!updatedPost) throw new HttpException("User not found", 404);
        return updatedPost;
    }

    @Delete(':id')
    async deletePostById(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("Ivalid ID", 404);
        
        const deletedUser = await this.postsService.deletePostById(id);
        if(!deletedUser) throw new HttpException("User not found", 404);
        return;
    }
}
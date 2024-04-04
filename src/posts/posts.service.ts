import { HttpException, Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "src/schemas/Post.schema";
import { CreatePostDto } from "./dto/CreatePost.dto";
import { User } from "src/schemas/User.schema";
import { UpdatePostDto } from "./dto/UpdatePost.dto";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>){}

    async createPost({userId, ...createPostDto}: CreatePostDto){
        const findUser = await this.userModel.findById(userId)
        if(!findUser) throw new HttpException("User Not Found", 404);
        const newPost = new this.postModel(createPostDto);
        const savedPost = await newPost.save();
        await findUser.updateOne({$push: {
            posts: savedPost._id,
        }});
        return savedPost;
    }

    getPosts(){
        return this.postModel.find();
    }

    getPostById(id: string){
        return this.userModel.findById(id);
    }

    updatePostById(id: string, updatePostDto: UpdatePostDto){
        return this.postModel.findByIdAndUpdate(id, updatePostDto, {new: true});
    }

    deletePostById(id: string){
        return this.postModel.findByIdAndDelete(id)
    }
}
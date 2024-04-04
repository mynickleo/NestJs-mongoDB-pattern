import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Post{
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    contentText: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
import { Document, ObjectId } from "mongoose";

export interface IPost extends Document {
  author: {
    id: ObjectId | string;
  };
  _id?: ObjectId | string;
  content: string;
  images?: string[];
  likes: Number;
  comments: Number;
}

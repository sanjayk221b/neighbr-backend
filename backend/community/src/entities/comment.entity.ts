import { Document, Types } from "mongoose";

export interface IComment {
  author: {
    id: string | Types.ObjectId;
  };
  post: Types.ObjectId | string;
  content: string;
}

import { Types } from "mongoose";

export interface ILike {
  author: {
    id: string | Types.ObjectId;
    name: string;
  };
  post: Types.ObjectId;
}

import { ObjectId } from "mongoose";

export interface IReport {
  _id?: ObjectId | string;
  postId: ObjectId | string;
  reporterId: ObjectId | string;
  reason: string;
}

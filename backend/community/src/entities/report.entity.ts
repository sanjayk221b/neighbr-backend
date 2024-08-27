import { ObjectId } from "mongodb";

export interface IReport {
  id?: ObjectId;
  postId: ObjectId | string;
  reporterId: ObjectId | string;
  reason: string;
}

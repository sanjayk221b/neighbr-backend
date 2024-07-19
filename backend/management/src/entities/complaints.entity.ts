import { ObjectId } from "mongoose";

export interface IComplaint {
  _id?: ObjectId;
  title: string;
  description?: string;
  residentId: ObjectId;
  isResolved: boolean;
  image?: string;
}

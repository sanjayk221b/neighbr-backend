import { ObjectId } from "mongoose";

export interface IWorker {
  _id?: ObjectId;
  name: string;
  email: string;
  mobileNumber: string;
  serviceType: string;
  isAvailable?: boolean;
  isBlocked?: boolean;
  imageUrl?: string;
}

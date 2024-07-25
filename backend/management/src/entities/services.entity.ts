import { ObjectId } from "mongoose";

export interface IService {
  serviceType: string;
  residentId: ObjectId;
  apartmentNumber: string;
  date: Date;
  time: string;
  mobileNumber: string;
  description?: string;
  workerName?: string;
  solvedDate?: Date;
  imageUrl?: string;
  status: "pending" | "in-progress" | "completed";
}

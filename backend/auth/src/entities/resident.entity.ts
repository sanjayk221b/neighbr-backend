import { ObjectId } from "mongoose";

export interface IResident {
  _id?: ObjectId;
  name: string;
  email: string;
  mobileNumber: string;
  apartmentNumber: string;
  password: string;
  isBlocked?: boolean;
  isAdmin?: boolean;
  hasVehicle?: boolean;
  vehicles?: [string];
  image?: string;
}

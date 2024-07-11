import mongoose, { Schema, Document } from "mongoose";
import IResident from "../../../../entities/resident.entity";

const userSchema = new mongoose.Schema<IResident>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      unique: true,
      required: true,
    },
    apartmentNumber: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    hasVehicle: {
      type: Boolean,
      default: false,
    },
    vehicles: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IResident>("User", userSchema);

export default User;

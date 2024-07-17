import mongoose, { Schema, Document } from "mongoose";
import {IResident} from "../../../../entities";

const residentSchema = new mongoose.Schema<IResident>(
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

const Resident = mongoose.model<IResident>("Resident", residentSchema);

export default Resident;

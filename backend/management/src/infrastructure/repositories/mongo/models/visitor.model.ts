import mongoose, { Schema, Document } from "mongoose";
import { IVisitor } from "@/entities";

const visitorSchema = new mongoose.Schema<IVisitor>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    apartmentNumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    hasVehicle: {
      type: Boolean,
      required: true,
    },
    vehicleNumber: {
      type: String,
      default: "",
    },
    checkinDate: {
      type: Date,
      required: true,
    },
    checkinTime: {
      type: String,
      required: true,
    },
    checkoutTime: {
      type: String,
      default: "",
    },
    purpose: {
      type: String,
      default: "",
    },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Visitor = mongoose.model<IVisitor>("Visitor", visitorSchema);

export default Visitor;

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
      default:
        "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
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

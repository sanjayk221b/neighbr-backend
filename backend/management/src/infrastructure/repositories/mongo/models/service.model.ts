import mongoose from "mongoose";
import { IService } from "../../../../entities";

const serviceSchema = new mongoose.Schema<IService>(
  {
    serviceType: {
      type: String,
      required: true,
      enum: ["plumbing", "electrical", "cleaning", "laundry", "other"],
    },
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    workerName: {
      type: String,
      default: "",
    },
    solvedDate: {
      type: Date,
      default: null,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
      required: true,
    },
    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model<IService>("Service", serviceSchema);

export default Service;

import { Schema, model } from "mongoose";
import { IWorker } from "@/entities/worker.entity";

const workerSchema = new Schema<IWorker>({
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
  serviceType: {
    type: String,
    required: true,
    enum: ["plumbing", "electrical", "cleaning", "laundry", "other"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
  },
});

const Worker = model<IWorker>("Worker", workerSchema);

export default Worker;

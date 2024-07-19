import mongoose, { Schema, Document } from "mongoose";
import { IComplaint } from "../../../../entities";

const complaintSchema = new mongoose.Schema<IComplaint>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true,
    },
    isResolved: {
      type: Boolean,
      default: false,
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

const Complaint = mongoose.model<IComplaint>("Complaint", complaintSchema);

export default Complaint;

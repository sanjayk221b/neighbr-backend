import mongoose, { Schema, Document } from "mongoose";
import { IReport } from "@/entities";

const reportSchema = new mongoose.Schema<IReport>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    reporterId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Resident",
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model<IReport>("Report", reportSchema);

export default Report;

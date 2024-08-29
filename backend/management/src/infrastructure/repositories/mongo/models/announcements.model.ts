import mongoose, { Schema, Document } from "mongoose";
import { IAnnouncement } from "@/entities";
const announcementSchema = new Schema<IAnnouncement>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ["Event", "News", "Update"],
      default: "News",
    },
    status: {
      type: String,
      enum: ["Active", "Draft", "Archived"],
      default: "Active",
    },
    readBy: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model<IAnnouncement>(
  "Announcement",
  announcementSchema
);

export default Announcement;

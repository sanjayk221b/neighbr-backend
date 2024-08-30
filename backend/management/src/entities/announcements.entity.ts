import mongoose from "mongoose";

export interface IAnnouncement {
  title: string;
  content: string;
  date: Date;
  type?: "Event" | "News" | "Update";
  status: "Active" | "Draft" | "Archived";
  readBy: mongoose.Schema.Types.ObjectId[];
}

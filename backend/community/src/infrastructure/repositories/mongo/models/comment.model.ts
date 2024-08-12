import { Schema, model } from "mongoose";
import { IComment } from "@/entities";

const CommentSchema = new Schema<IComment>(
  {
    author: {
      id: { type: Schema.Types.ObjectId, required: true, ref: "Resident" },
    },
    post: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = model<IComment>("Comment", CommentSchema);

export default Comment;

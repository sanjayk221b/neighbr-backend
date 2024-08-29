import { Schema, model } from "mongoose";
import { IPost } from "@/entities";

const PostSchema = new Schema<IPost>(
  {
    author: {
      id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Resident",
      },
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", PostSchema);

export default Post;

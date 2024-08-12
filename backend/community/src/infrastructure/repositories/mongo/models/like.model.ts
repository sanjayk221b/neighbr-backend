import { Schema, model } from "mongoose";
import { ILike } from "@/entities";

const LikeSchema = new Schema<ILike>(
  {
    author: {
      id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      name: { type: String, required: true },
    },
    post: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
  },
  { timestamps: true }
);

const Like = model<ILike>("Like", LikeSchema);

export default Like;

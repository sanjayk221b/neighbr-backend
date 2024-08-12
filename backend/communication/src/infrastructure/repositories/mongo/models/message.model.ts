import mongoose, { Schema, Document } from "mongoose";
import { IMessage } from "@/entities";

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: String,
      required: true,
      refPath: "senderType",
    },
    senderType: {
      type: String,
      enum: ["resident", "caretaker", "admin"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video", "document", "audio", "none"],
      default: "none",
    },
    mediaUrl: {
      type: String,
      default: "",
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Conversation",
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ conversationId: 1, createdAt: 1 });

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;

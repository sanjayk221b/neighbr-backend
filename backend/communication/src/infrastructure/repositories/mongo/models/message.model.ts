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
    },
    mediaType: {
      type: String,
      enum: ["image", "document", "none"],
      default: "none",
    },
    mediaUrl: {
      type: String,
      default: null,
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

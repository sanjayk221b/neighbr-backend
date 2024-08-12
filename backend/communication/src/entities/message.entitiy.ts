import { ObjectId } from "mongoose";

export interface IMessage {
  _id?: string;
  senderId: string;
  senderType: "resident" | "caretaker" | "admin";
  content: string;
  mediaType: "image" | "video" | "document" | "audio" | "none";
  mediaUrl?: string;
  conversationId: ObjectId;
}

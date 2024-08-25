import { ObjectId } from "mongoose";

export interface IMessage {
  _id?: string;
  senderId: string;
  senderType: "resident" | "caretaker" | "admin";
  content: string;
  mediaType: "image" | "document" | "none";
  mediaUrl?: string;
  conversationId: ObjectId;
}
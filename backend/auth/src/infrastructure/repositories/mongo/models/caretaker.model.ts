import mongoose, { Schema, Document } from "mongoose";
import { ICaretaker } from "@/entities"; 

const caretakerSchema = new mongoose.Schema<ICaretaker>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Caretaker = mongoose.model<ICaretaker>("Caretaker", caretakerSchema);

export default Caretaker;

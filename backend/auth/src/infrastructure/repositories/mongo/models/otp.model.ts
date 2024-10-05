import mongoose from "mongoose";
import { IOTP } from "@/entities";

const otpSchema = new mongoose.Schema<IOTP>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      index: { expires: 0 },
    },
    userType: {
      type: String,
      required: true,
      enum: ["resident", "caretaker"],
    },
  },
  {
    timestamps: true,
  }
);

otpSchema.pre("save", function (next) {
  const expirationTime = 12 * 1000;
  this.expiresAt = new Date(Date.now() + expirationTime);
  next();
});

const Otp = mongoose.model<IOTP>("Otp", otpSchema);

export default Otp;

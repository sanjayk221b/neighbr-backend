import express from "express";
// import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../repositories/mongo/connect";
import { errorHandler, requestLogger, loadEnv } from "@neighbr/common";
import {
  adminRoutes,
  caretakerRoutes,
  otpRoutes,
  residentRoutes,
  workerRoutes,
} from "../routes";

// const { CLIENT_URL } = loadEnv(["CLIENT_URL"]);

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: CLIENT_URL,
//     credentials: true,
//   })
// );

app.use(requestLogger);

app.use("/api/auth/admin", adminRoutes);
app.use("/api/auth/caretaker", caretakerRoutes);
app.use("/api/auth/resident", residentRoutes);
app.use("/api/auth/workers", workerRoutes);
app.use("/api/auth/otp", otpRoutes);

app.use(errorHandler);

export default app;

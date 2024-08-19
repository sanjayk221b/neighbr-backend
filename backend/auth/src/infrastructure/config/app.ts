import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../repositories/mongo/connect";
import adminRoutes from "../routes/admin.routes";
import caretakerRoutes from "../routes/caretaker.routes";
import residentRoutes from "../routes/resident.routes";
import workerRoutes from "../routes/worker.routes";
import { errorHandler } from "@neighbr/common";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth/admin", adminRoutes);
app.use("/api/auth/caretaker", caretakerRoutes);
app.use("/api/auth/resident", residentRoutes);
app.use("/api/auth/workers", workerRoutes);

app.use(errorHandler);

export default app;

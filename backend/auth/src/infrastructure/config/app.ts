import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../repositories/mongo/connect";
import adminRoutes from "../routes/admin.routes";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use("/api/auth/user", userRoutes);
app.use("/api/auth/admin", adminRoutes);
// app.use("/api/auth/caretaker/", caretakerRoutes);

export default app;

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../repositories/mongo/connect";
import visitorRoutes from "../routes/visitor.routes";

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

app.use('/api/auth', (req, res, next) => {
  console.log('[Auth Service] Received request:', req.method, req.url);
  console.log('[Auth Service] Request body:', req.body);
  next();
});

app.get("/api/management", (req, res) => {
  res.send("Server is running management 4002");
});

app.use("/api/management/visitors", visitorRoutes);

export default app;

import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "../middlewares/errorHandler";
import connectDB from "@/infrastructure/repositories/mongo/connect";
import communityRoutes from "../routes/v1/community.routes";
import {
  connectResidentUpdatedConsumer,
  disconnectResidentUpdatedConsumer,
} from "@/events/consumers";
import requestLoggerMiddleware from "@neighbr/common/dist/middlewares/requestLogger.middleware";

const app = express();

// Database and Event Consumers
connectDB();
connectResidentUpdatedConsumer();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(requestLoggerMiddleware);

app.use("/api/v1/community", communityRoutes);

app.use(errorHandler);

process.on("SIGINT", async () => {
  try {
    await disconnectResidentUpdatedConsumer();
    process.exit(0);
  } catch (error) {
    console.error("Error during graceful shutdown", error);
    process.exit(1);
  }
});

export default app;

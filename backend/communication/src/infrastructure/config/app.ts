import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "@neighbr/common";
import connectDB from "@/infrastructure/repositories/mongo/connect";
import {
  connectResidentUpdatedConsumer,
  disconnectResidentUpdatedConsumer,
  connectCaretakerUpdatedConsumer,
  disconnectCaretakerUpdatedConsumer,
} from "@/events/consumers";
import chatRoutes from "@/infrastructure/routes/chat.routes";
import http from "http";
import { SocketService } from "../services/socket";

const app = express();
const httpServer = http.createServer(app);

// Create an instance of SocketService
const socketService = new SocketService();

// Initialize Socket.IO
socketService.initialize(httpServer);

// Database and Event Consumers
connectDB();
connectResidentUpdatedConsumer();
connectCaretakerUpdatedConsumer();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/communication/chat", chatRoutes);

// Error Handler
app.use(errorHandler);

// Graceful Shutdown
process.on("SIGINT", async () => {
  await disconnectResidentUpdatedConsumer();
  await disconnectCaretakerUpdatedConsumer();
  socketService.close();
});

export { app, httpServer, socketService };

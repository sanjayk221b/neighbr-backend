import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "../repositories/mongo/connect";
import visitorRoutes from "../routes/visitor.routes";
import serviceRoutes from "../routes/services.routes";
import complaintRoutes from "../routes/complaints.routes";
import workerRoutes from "../routes/worker.routes";
import announcementRoutes from "../routes/announcements.routes";
import dashboardRoutes from "../routes/dashboard.routes";
import {
  connectResidentUpdatedConsumer,
  disconnectResidentUpdatedConsumer,
} from "../../events/consumers/resident-updated.consumer";
import { errorHandler, loadEnv, requestLogger } from "@neighbr/common";

const { CLIENT_URL } = loadEnv(["CLIENT_URL"]);

const app = express();

connectDB();
connectResidentUpdatedConsumer();

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

app.use("/api/management/visitors", visitorRoutes);
app.use("/api/management/services", serviceRoutes);
app.use("/api/management/complaints", complaintRoutes);
app.use("/api/management/workers", workerRoutes);
app.use("/api/management/announcements", announcementRoutes);
app.use("/api/management/dashboard", dashboardRoutes);

app.use(errorHandler);

process.on("SIGINT", async () => {
  await disconnectResidentUpdatedConsumer();
  process.exit();
});

export default app;

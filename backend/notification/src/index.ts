import express, { Application } from "express";
import { config } from "dotenv";
import {
  connectResidentCreatedConsumer,
  disconnectResidentCreatedConsumer,
} from "./events/kafka/consumers/resident-created.consumer";
import {
  connectCaretakerCreatedConsumer,
  disconnectCaretakerCreatedConsumer,
} from "./events/kafka/consumers/caretaker-created.consumer";

config();
const app: Application = express();
const PORT: number = Number(process.env.PORT);

const startServer = async () => {
  try {
    await connectResidentCreatedConsumer();
    await connectCaretakerCreatedConsumer();

    app.listen(PORT, () => {
      `[ SERVICE :: NOTIFICATION SERVICE] is listening on http://localhost:${PORT}`;
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();

process.on("SIGINT", async () => {
  try {
    await disconnectResidentCreatedConsumer();
    await disconnectCaretakerCreatedConsumer();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});

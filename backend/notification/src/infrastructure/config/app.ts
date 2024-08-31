import express from "express";
import { config } from "dotenv";
import {
  connectResidentCreatedConsumer,
  disconnectResidentCreatedConsumer,
} from "@/events/kafka/consumers/resident-created.consumer";
import {
  connectCaretakerCreatedConsumer,
  disconnectCaretakerCreatedConsumer,
} from "@/events/kafka/consumers/caretaker-created.consumer";

config();
const app = express();

const initializeKafkaConsumers = async () => {
  try {
    await connectResidentCreatedConsumer();
    await connectCaretakerCreatedConsumer();
  } catch (error) {
    process.exit(1);
  }
};

initializeKafkaConsumers();

process.on("SIGINT", async () => {
  try {
    await disconnectResidentCreatedConsumer();
    await disconnectCaretakerCreatedConsumer();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
});

export default app;

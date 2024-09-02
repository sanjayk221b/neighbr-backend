import express from "express";
import dotenv from "dotenv";
import {
  connectResidentCreatedConsumer,
  disconnectResidentCreatedConsumer,
} from "@/events/kafka/consumers/resident-created.consumer";
import {
  connectCaretakerCreatedConsumer,
  disconnectCaretakerCreatedConsumer,
} from "@/events/kafka/consumers/caretaker-created.consumer";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

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

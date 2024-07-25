import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:29092"],
  logLevel: 2,
});

export default kafka;

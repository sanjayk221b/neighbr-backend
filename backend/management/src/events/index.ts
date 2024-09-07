import { Kafka } from "kafkajs";
import { loadEnv } from "@neighbr/common";

const { KAFKA_BROKER } = loadEnv(["KAFKA_BROKER"]);

const kafka = new Kafka({
  clientId: "management-service",
  brokers: [KAFKA_BROKER],
  logLevel: 5,
});

export default kafka;

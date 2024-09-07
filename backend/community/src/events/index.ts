import { Kafka } from "kafkajs";
import { loadEnv } from "@neighbr/common";

const { KAFKA_BROKER } = loadEnv(["KAFKA_BROKER"]);

const kafka = new Kafka({
  clientId: "community-service",
  brokers: [KAFKA_BROKER],
  logLevel: 2,
});

export default kafka;

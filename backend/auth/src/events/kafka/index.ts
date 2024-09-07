import { loadEnv } from "@neighbr/common";
import { Kafka, Partitioners } from "kafkajs";

const { KAFKA_BROKER } = loadEnv(["KAFKA_BROKER"]);

const kafka = new Kafka({
  clientId: "auth-service",
  brokers: [KAFKA_BROKER],
});

export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

export const connectProducer = async () => {
  await producer.connect();
};

export const disconnectProducer = async () => {
  await producer.disconnect();
};

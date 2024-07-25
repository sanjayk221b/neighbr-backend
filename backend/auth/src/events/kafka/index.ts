import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'auth-service',
    brokers: ['localhost:29092']
});

export const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
});

export const connectProducer = async () => {
    await producer.connect();
};

export const disconnectProducer = async () => {
    await producer.disconnect();
};
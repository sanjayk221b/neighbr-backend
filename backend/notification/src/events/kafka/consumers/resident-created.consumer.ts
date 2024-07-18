import kafka from "../index";
import { sendEmail } from "../../../services/email.service";

const consumer = kafka.consumer({
  groupId: "notification-resident-created-group",
  retry: { retries: 10 },
});

export const connectResidentCreatedConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Consumer connected successfully");
    await consumer.subscribe({
      topic: "resident-created",
      fromBeginning: true,
    });
    console.log("Subscribed to topic: resident-created");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value) {
          const residentData = JSON.parse(message.value.toString());
          sendEmail(residentData);
          console.log("New resident created:", residentData);
        }
      },
    });
  } catch (error) {
    console.error("Error in connectresidentCreatedConsumer:", error);
    throw error;
  }
};

export const disconnectResidentCreatedConsumer = async () => {
  await consumer.disconnect();
};
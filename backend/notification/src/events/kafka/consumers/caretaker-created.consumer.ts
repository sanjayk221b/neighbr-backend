import kafka from "../index";
import { sendEmail } from "../../../infrastructure/services/email.service";

const caretakerConsumer = kafka.consumer({
  groupId: "notification-caretaker-created-group",
  retry: { retries: 10 },
});

export const connectCaretakerCreatedConsumer = async () => {
  try {
    await caretakerConsumer.connect();
    console.log("Caretaker Consumer connected successfully");
    await caretakerConsumer.subscribe({
      topic: "caretaker-created",
      fromBeginning: true,
    });
    console.log("Subscribed to topic: caretaker-created");

    await caretakerConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value) {
          const caretakerData = JSON.parse(message.value.toString());
          sendEmail(caretakerData);
          console.log("New caretaker created:", caretakerData);
        }
      },
    });
  } catch (error) {
    console.error("Error in connectCaretakerCreatedConsumer:", error);
    throw error;
  }
};

export const disconnectCaretakerCreatedConsumer = async () => {
  await caretakerConsumer.disconnect();
};
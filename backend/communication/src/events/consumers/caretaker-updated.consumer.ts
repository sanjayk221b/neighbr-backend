import kafka from "../index";
import { CaretakerRepository } from "@/infrastructure/repositories/mongo";

const consumer = kafka.consumer({
  groupId: "communication-caretaker-updated-group",
  retry: { retries: 10 },
});

const caretakerRepository = new CaretakerRepository();

export const connectCaretakerUpdatedConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Consumer connected successfully");
    await consumer.subscribe({
      topic: "caretaker-updated",
      fromBeginning: true,
    });
    console.log("Subscribed to topic: caretaker-updated");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value) {
          const caretakerData = JSON.parse(message.value.toString());

          try {
            const updatedCaretaker = await caretakerRepository.updateCaretaker(
              caretakerData
            );
            console.log("Caretaker updated in database:", updatedCaretaker);
          } catch (error) {
            console.error("Error updating caretaker in database:", error);
          }
        }
      },
    });
  } catch (error) {
    console.error("Error in connectCaretakerUpdatedConsumer:", error);
    throw error;
  }
};

export const disconnectCaretakerUpdatedConsumer = async () => {
  await consumer.disconnect();
};

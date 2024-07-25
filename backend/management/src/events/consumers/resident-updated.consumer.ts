import kafka from "../index";
import { ResidentRepository } from "../../infrastructure/repositories/mongo";

const consumer = kafka.consumer({
  groupId: "management-resident-updated-group",
  retry: { retries: 10 },
});

const residentRepository = new ResidentRepository();

export const connectResidentUpdatedConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Consumer connected successfully");
    await consumer.subscribe({
      topic: "resident-updated",
      fromBeginning: true,
    });
    console.log("Subscribed to topic: resident-updated");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value) {
          const residentData = JSON.parse(message.value.toString());

          try {
            const updatedResident = await residentRepository.updateResident(
              residentData
            );
            console.log("Resident updated in database:", updatedResident);
          } catch (error) {
            console.error("Error updating resident in database:", error);
          }
        }
      },
    });
  } catch (error) {
    console.error("Error in connectResidentUpdatedConsumer:", error);
    throw error;
  }
};

export const disconnectResidentUpdatedConsumer = async () => {
  await consumer.disconnect();
};

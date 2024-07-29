import { producer, connectProducer, disconnectProducer } from "../index";
import { IResident } from "@/entities";

export const sendResidentUpdatedEvent = async (resident: IResident) => {
  await connectProducer();
  try {
    await producer.send({
      topic: "resident-updated",
      messages: [
        {
          value: JSON.stringify(resident),
        },
      ],
    });
  } catch (error) {
    console.error("Failed to send resident updated event:", error);
  }
  await disconnectProducer();
};

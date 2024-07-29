import { producer, connectProducer, disconnectProducer } from "../index";
import { IResident } from "@/entities";

export const sendResidentCreatedEvent = async (resident: IResident) => {
  await connectProducer();
  try {
    await producer.send({
      topic: "resident-created",
      messages: [
        {
          value: JSON.stringify(resident),
        },
      ],
    });
  } catch (error) {
    console.error("Failed to send resident created event:", error);
  }
  await disconnectProducer();
};

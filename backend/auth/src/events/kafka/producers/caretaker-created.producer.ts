import { producer, connectProducer, disconnectProducer } from "../index";
import ICaretaker from "@/entities/caretaker.entity";

export const sendCaretakerCreatedEvent = async (caretaker: ICaretaker) => {
  await connectProducer();
  try {
    await producer.send({
      topic: "caretaker-created",
      messages: [
        {
          value: JSON.stringify(caretaker),
        },
      ],
    });
  } catch (error) {
    console.error("Failed to send caretaker created event:", error);
  }
  await disconnectProducer();
};
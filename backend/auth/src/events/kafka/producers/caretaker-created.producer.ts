import { producer, connectProducer, disconnectProducer } from "@/events/kafka";
import { ICaretaker } from "@/entities";

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

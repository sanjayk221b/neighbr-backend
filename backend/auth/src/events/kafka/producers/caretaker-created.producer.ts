import { producer, connectProducer, disconnectProducer } from "@/events/kafka";
import { ICaretaker } from "@/entities";
import { logger } from "@neighbr/common";

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
    logger.info("Caretaker created event sent successfully");
  } catch (error) {
    logger.error("Failed to send caretaker created event:", error);
  }
  await disconnectProducer();
};

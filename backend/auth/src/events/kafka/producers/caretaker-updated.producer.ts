import { producer, connectProducer, disconnectProducer } from "@/events/kafka";
import { ICaretaker } from "@/entities";
import { logger } from "@neighbr/common";

export const sendCaretakerUpdatedEvent = async (caretaker: ICaretaker) => {
  await connectProducer();
  try {
    await producer.send({
      topic: "caretaker-updated",
      messages: [
        {
          value: JSON.stringify(caretaker),
        },
      ],
    });
    logger.info("Caretaker updated event sent successfully");
  } catch (error) {
    logger.error("Failed to send caretaker updated event:", error);
  }
  await disconnectProducer();
};

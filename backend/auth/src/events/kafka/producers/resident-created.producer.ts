import { producer, connectProducer, disconnectProducer } from "../index";
import { IResident } from "@/entities";
import { logger } from "@neighbr/common";

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
    logger.info("Resident created event sent successfully");
  } catch (error) {
    logger.error("Failed to send resident created event:", error);
  }
  await disconnectProducer();
};

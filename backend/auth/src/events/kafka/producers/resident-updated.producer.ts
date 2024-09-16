import { producer, connectProducer, disconnectProducer } from "../index";
import { IResident } from "@/entities";
import { logger } from "@neighbr/common";

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
    logger.info("Resident updated event sent successfully");
  } catch (error) {
    logger.error("Failed to send resident updated event:", error);
  }
  await disconnectProducer();
};

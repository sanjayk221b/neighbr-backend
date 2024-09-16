import { producer, connectProducer, disconnectProducer } from "@/events/kafka";
import { IOTP } from "@/entities";
import { logger } from "@neighbr/common";

export const sendOtpGeneratedEvent = async (otpData: IOTP) => {
  await connectProducer();
  try {
    await producer.send({
      topic: "otp-generated",
      messages: [
        {
          value: JSON.stringify(otpData),
        },
      ],
    });
    logger.info("OTP generated event sent successfully");
  } catch (error) {
    logger.error("Failed to send OTP generated event:", error);
  }
  await disconnectProducer();
};

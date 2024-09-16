import kafka from "../index";
import { sendEmail } from "../../../infrastructure/services/email.service";
import { logger } from "@neighbr/common";

const otpConsumer = kafka.consumer({
  groupId: "notification-otp-group",
  retry: { retries: 10 },
});

export const connectOtpConsumer = async () => {
  try {
    await otpConsumer.connect();
    logger.info("OTP Consumer connected successfully");

    await otpConsumer.subscribe({
      topic: "otp-generated",
      fromBeginning: true,
    });
    logger.info("Subscribed to topic: otp-generated");

    await otpConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.value) {
          const otpData = JSON.parse(message.value.toString());

          const emailSubject = "Your OTP Code";
          const emailHtml = `
            <p>Hello ${otpData.name},</p>
            <p>Your OTP code for logging in to our app is:</p>
            <h3>${otpData.otp}</h3>
            <p>This OTP is valid for ${otpData.expiration} minutes. Please use it to complete your login process.</p>
          `;

          await sendEmail(otpData.email, emailSubject, emailHtml);
          logger.info(`OTP sent to: ${otpData.email}`);
        }
      },
    });
  } catch (error) {
    logger.error("Error in connectOtpConsumer:", error);
    throw error;
  }
};

export const disconnectOtpConsumer = async () => {
  await otpConsumer.disconnect();
  logger.info("OTP Consumer disconnected");
};

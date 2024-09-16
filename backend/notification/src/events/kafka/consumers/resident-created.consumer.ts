import kafka from "../index";
import { sendEmail } from "../../../infrastructure/services/email.service";
import { logger } from "@neighbr/common";

const consumer = kafka.consumer({
  groupId: "notification-resident-created-group",
  retry: { retries: 10 },
});

export const connectResidentCreatedConsumer = async () => {
  try {
    await consumer.connect();
    logger.info("Consumer connected successfully");

    await consumer.subscribe({
      topic: "resident-created",
      fromBeginning: true,
    });
    logger.info("Subscribed to topic: resident-created");

    await consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value) {
          const residentData = JSON.parse(message.value.toString());

          const emailSubject = "Welcome to Our App!";
          const emailHtml = `
            <p>Hello ${residentData.name},</p>
            <p>Welcome to our Resident Visitor Management App. We're excited to have you!</p>
            <p>Your login credentials are:</p>
            <p><strong>Email:</strong> ${residentData.email}</p>
            <p><strong>Temporary Password:</strong> ${residentData.password}</p>
            <p>Please log in and change your password immediately.</p>
          `;

          await sendEmail(residentData.email, emailSubject, emailHtml);
          logger.info(`New resident created: ${residentData.email}`);
        }
      },
    });
  } catch (error) {
    logger.error("Error in connectResidentCreatedConsumer:", error);
    throw error;
  }
};

export const disconnectResidentCreatedConsumer = async () => {
  await consumer.disconnect();
  logger.info("Consumer disconnected");
};

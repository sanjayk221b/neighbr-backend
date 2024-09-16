import kafka from "../index";
import { sendEmail } from "@/infrastructure/services/email.service";
import { logger } from "@neighbr/common";

const caretakerConsumer = kafka.consumer({
  groupId: "notification-caretaker-created-group",
  retry: { retries: 10 },
});

export const connectCaretakerCreatedConsumer = async () => {
  try {
    await caretakerConsumer.connect();
    logger.info("Caretaker Consumer connected successfully");

    await caretakerConsumer.subscribe({
      topic: "caretaker-created",
      fromBeginning: true,
    });
    logger.info("Subscribed to topic: caretaker-created");

    await caretakerConsumer.run({
      eachMessage: async ({ message }) => {
        if (message.value) {
          const caretakerData = JSON.parse(message.value.toString());

          const emailSubject = "Welcome to Our App!";
          const emailHtml = `
            <p>Hello ${caretakerData.name},</p>
            <p>Welcome to our Resident Visitor Management App. We're excited to have you as a caretaker!</p>
            <p>Your login credentials are:</p>
            <p><strong>Email:</strong> ${caretakerData.email}</p>
            <p><strong>Temporary Password:</strong> ${caretakerData.password}</p>
            <p>Please log in and change your password immediately.</p>
          `;

          await sendEmail(caretakerData.email, emailSubject, emailHtml);
          logger.info(`New caretaker created: ${caretakerData.email}`);
        }
      },
    });
  } catch (error) {
    logger.error("Error in connectCaretakerCreatedConsumer:", error);
    throw error;
  }
};

export const disconnectCaretakerCreatedConsumer = async () => {
  await caretakerConsumer.disconnect();
  logger.info("Caretaker Consumer disconnected");
};

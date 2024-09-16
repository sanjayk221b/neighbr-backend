import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { logger, loadEnv } from "@neighbr/common";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// const { EMAIL_USER, EMAIL_PASS } = loadEnv(["EMAIL_USER, EMAIL_PASS"]);

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: "kxep rhia exxg wutl",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

/**
 * Dynamically send an email based on the event type
 * @param {string} email - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 */
export const sendEmail = async (
  email: string,
  subject: string,
  html: string
) => {
  try {
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully:", info.messageId);
  } catch (error) {
    logger.error("Error sending email:", error);
    throw error;
  }
};

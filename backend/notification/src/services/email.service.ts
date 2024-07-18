import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

// Create a transporter using Gmail
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: "kxep rhia exxg wutl",
  },
});

// Test the connection
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export const sendEmail = async (userData: any) => {
  try {
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: userData.email,
      subject: "Welcome to Our App!",
      html: `
      <div style="background: linear-gradient(to bottom, #EBF4FF, #FFFFFF); padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="background: linear-gradient(to right, #3B82F6, #1E40AF); padding: 40px 0; text-align: center;">
            <h1 style="font-size: 28px; font-weight: bold; color: #ffffff; margin: 0;">Welcome to Our Community!</h1>
          </div>
          <div style="padding: 40px;">
            <p style="font-size: 18px; color: #1E40AF; margin-bottom: 20px;">Hello, <strong>${userData.name}</strong>!</p>
            <p style="font-size: 16px; color: #4B5563; margin-bottom: 15px;">Thank you for joining our Resident Visitor Management App. We're excited to have you on board and help you manage your visitors with ease.</p>
            <p style="font-size: 16px; color: #4B5563; margin-bottom: 15px;">Here are your login credentials:</p>
            <div style="background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 15px; margin-bottom: 20px;">
              <p style="font-size: 16px; color: #1E40AF; margin: 0;">Email: <strong>${userData.email}</strong></p>
              <p style="font-size: 16px; color: #1E40AF; margin: 10px 0 0;">Temporary Password: <strong>${userData.password}</strong></p>
            </div>
            <p style="font-size: 16px; color: #4B5563; margin-bottom: 20px;"><strong>Important:</strong> Please log in using this temporary password and change it immediately for security reasons.</p>
            <a href="#" style="display: inline-block; background-color: #3B82F6; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: bold;">Log In Now</a>
            <p style="font-size: 16px; color: #4B5563; margin-top: 30px;">If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            <p style="font-size: 16px; color: #4B5563; margin-bottom: 0;">Welcome aboard!</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <p style="font-size: 14px; color: #6B7280;">&copy; 2024 Your App Name. All rights reserved.</p>
        </div>
      </div>
    `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

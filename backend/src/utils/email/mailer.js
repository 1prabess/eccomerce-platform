import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function mailer(template, recipient, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.PLATFORM_EMAIL,
        pass: process.env.PLATFORM_EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Wearvio" <${process.env.PLATFORM_EMAIL}>`,
      to: recipient,
      replyTo: process.env.PLATFORM_EMAIL,
      subject,
      text: text,
      html: template,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}

export default mailer;

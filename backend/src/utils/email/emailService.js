import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import dotenv from "dotenv";
import mailer from "./mailer.js";

dotenv.config();

// ___________Verification Email_________________
export const sendVerificationEmail = async (verificationToken, recipient) => {
  const subject = "Verify Your Email Address";
  const text = `Your verification code is: ${verificationToken}`;
  const template = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationToken
  );

  await mailer(template, recipient, subject, text);
  console.log("Verification Mail Sent Successfully");
};

// ___________Welcome Email_________________
export const sendWelcomeEmail = async (recipient) => {
  const subject = "Welcome to our app!";
  const text = `Hope you enjoy our company.`;

  await mailer(WELCOME_EMAIL_TEMPLATE, recipient, subject, text);
  console.log("Welcome Mail Sent Successfully");
};

// ___________Reset Password Email_________________
export const sendResetPasswordEmail = async (resetPasswordToken, recipient) => {
  const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`;
  const subject = "Reset Password";
  const text = `Please reset your password from the given link`;
  const template = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    "{resetURL}",
    resetPasswordUrl
  );

  await mailer(template, recipient, subject, text);
  console.log("Reset password Mail Sent Successfully");
};

// ___________Reset Password Success Email_________________
export const sendResetPasswordSuccessEmail = async (recipient) => {
  const subject = "Password Reset";
  const text = `Your password has been reset`;

  await mailer(PASSWORD_RESET_SUCCESS_TEMPLATE, recipient, subject, text);
  console.log("Reset password success Mail Sent Successfully");
};

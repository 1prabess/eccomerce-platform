import { StatusCodes } from "http-status-codes";
import User from "../../models/user.model.js";
import { sendWelcomeEmail } from "../../utils/email/emailService.js";

// ___________Verify Account_________________
export const verifyAccount = async (req, res) => {
  try {
    // Get token from params
    const { token } = req.params;

    if (!token)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No verification token provided." });

    // Get the user only if the token is valid
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Invalid or expired verification code." });

    // Verify the user
    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    // Send email
    await sendWelcomeEmail(user.email);

    return res.status(StatusCodes.OK).json({
      message: "User verified successfully!",
    });
  } catch (error) {
    console.log("Error in verifyAccount: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

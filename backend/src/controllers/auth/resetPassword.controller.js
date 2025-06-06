import { StatusCodes } from "http-status-codes";
import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { sendResetPasswordSuccessEmail } from "../../utils/email/emailService.js";

// ___________Reset Password_________________
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No reset password token provided." });

    // Get the user
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Invalid or expired reset password token." });

    // Generate salt for new password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and cleanup tokens
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    // Send email
    await sendResetPasswordSuccessEmail(user.email);

    return res.status(StatusCodes.OK).json({
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.log("Error in resetPassword: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

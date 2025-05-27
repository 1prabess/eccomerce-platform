import { StatusCodes } from "http-status-codes";
import User from "../../models/user.model.js";
import crypto from "crypto";

// ___________Forgot Password_________________
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Get the user
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "No user found." });

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = Date.now() + 1000 * 60 * 10;

    await user.save();

    return res.status(StatusCodes.OK).json({
      message: "Reset password token created!",
    });
  } catch (error) {
    console.log("Error in forgoutPassword: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

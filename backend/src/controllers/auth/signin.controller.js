import { StatusCodes } from "http-status-codes";
import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import generateAndSetToken from "../../utils/generateAndSetToken.js";

// ___________Sign In_________________
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check is any field is empty
    if (!email || !password)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required." });

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Invalid credentials." });

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Invalid credentials." });

    generateAndSetToken(res, user._id);

    return res.status(StatusCodes.OK).json({
      message: "Logged in successfully!",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in signin: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

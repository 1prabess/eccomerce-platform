import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateAndSetToken from "../utils/generateAndSetToken.js";

// ___________Sign up_________________
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check is any field is empty
    if (!fullName || !email || !password)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required." });

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User with same email already exists." });

    // Generate salt and hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create the user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // Save user to the database
    await user.save();

    // Generate token and set it on cookie
    generateAndSetToken(res, user._id);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully!" });
  } catch (error) {
    console.log("Error in signup: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

// ___________Admin Sign up_________________
export const adminSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check is any field is empty
    if (!fullName || !email || !password)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required." });

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Admin with same email already exists." });

    // Generate salt and hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      isVerified: true,
      role: "admin",
    });

    // Save user to the database
    await user.save();

    // Generate token and set it on cookie
    generateAndSetToken(res, user._id);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Admin created successfully!" });
  } catch (error) {
    console.log("Error in adminSignup: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

// ___________Sign In_________________
export const signin = async (req, res) => {
  res.send("Sign In");
};

// ___________Logout_________________
export const logout = async (req, res) => {
  res.send("logout");
};

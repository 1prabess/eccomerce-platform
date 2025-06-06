import { StatusCodes } from "http-status-codes";
import User from "../../models/user.model.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user
    const user = await User.findById(userId).select("-password");

    return res
      .status(StatusCodes.OK)
      .json({ message: "User fetched successfully!", user });
  } catch (error) {
    console.log("Error in getProfile: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

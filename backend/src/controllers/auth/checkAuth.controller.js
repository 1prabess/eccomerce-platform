import { StatusCodes } from "http-status-codes";

export const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      // User not authenticated
      return res
        .status(StatusCodes.OK)
        .json({ user: null, message: "Guest user" });
    }
    // User authenticated, send user data
    return res.status(StatusCodes.OK).json({ user: req.user });
  } catch (error) {
    console.log("Error in checkAuth: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

import { StatusCodes } from "http-status-codes";

// ___________Logout_________________
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(StatusCodes.OK).json({
      message: "Logged out successfully!",
    });
  } catch (error) {
    console.log("Error in logout: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

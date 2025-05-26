import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Unauthorized - No Token Provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Unauthorized - Invalid Token." });

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in authenticateMiddleware: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

export default authenticate;

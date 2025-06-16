import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticateOptional = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    req.user = user || null;
    next();
  } catch (error) {
    console.log("Error in authenticateOptional middleware:", error);
    req.user = null;
    next();
  }
};

export default authenticateOptional;

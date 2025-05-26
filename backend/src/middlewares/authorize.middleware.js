import { StatusCodes } from "http-status-codes";

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({
          message: "Unauthorized - You are not allowed to perform this action.",
        });
    }
    next();
  };
};

export default authorizeRoles;

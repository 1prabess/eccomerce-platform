import { StatusCodes } from "http-status-codes";
import Order from "../../models/order.model.js";

// ___________Get Order (Admin or Order Owner)_________________
export const getOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;
    const orderId = req.params.id;

    // Get order
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found." });
    }

    // Deny access if not the order owner or an admin
    if (String(userId) !== String(order.userId) && userRole !== "admin") {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Unauthorized - You are not allowed to perform this action.",
      });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Order fetched successfully!", order });
  } catch (error) {
    console.log("Error in getOrder: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

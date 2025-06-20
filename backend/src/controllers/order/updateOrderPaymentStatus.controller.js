import { StatusCodes } from "http-status-codes";
import Order from "../../models/order.model.js";

// ___________Update Order Payment Status_________________
export const updateOrderPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const userId = req.user._id;

    const userRole = req.user.role;

    if (!paymentStatus) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Payment status is required." });
    }

    const allowedStatuses = ["PENDING", "COMPLETED", "FAILED", "REFUNDED"];
    if (!allowedStatuses.includes(paymentStatus)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid payment status." });
    }

    // Get order by ID
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found." });
    }

    // CASE 1: Online Payment - allow if user owns the order
    if (order.paymentMethod === "digital") {
      if (order.userId.toString() !== userId.toString()) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "You are not authorized to update this order." });
      }
    }

    // CASE 2: Cash On Delivery - only Admins can update
    if (order.paymentMethod === "cash") {
      if (userRole !== "admin") {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "Only admin can update cash payment status." });
      }
    }

    // Update the order
    order.paymentStatus = paymentStatus;
    await order.save();

    return res.status(StatusCodes.OK).json({
      message: "Payment status updated successfully!",
      order,
    });
  } catch (error) {
    console.log("Error in updateOrderPaymentStatus: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

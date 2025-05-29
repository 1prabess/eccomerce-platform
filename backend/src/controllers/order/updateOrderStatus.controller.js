import { StatusCodes } from "http-status-codes";
import Order from "../../models/order.model.js";

// ___________Update Order Status_________________
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Order status is required." });
    }

    const allowedStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid order status." });
    }

    // Get the order by id and update
    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      {
        new: true, // Return updated order
        runValidators: true, // Validate against schema
      }
    );

    if (!order)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Order not found." });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Order status updated successfully!", order });
  } catch (error) {
    console.log("Error in updateOrderStatus: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

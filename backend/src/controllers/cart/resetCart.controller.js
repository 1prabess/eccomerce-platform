import { StatusCodes } from "http-status-codes";
import Cart from "../../models/cart.model.js";

// ___________Reset Cart________________
export const resetCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete all cart items for the user
    const deletedItems = await Cart.deleteMany({ userId });

    return res.status(StatusCodes.OK).json({
      message: "Cart reset successfully.",
      deletedCount: deletedItems.deletedCount,
    });
  } catch (error) {
    console.error("Error in resetCart:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

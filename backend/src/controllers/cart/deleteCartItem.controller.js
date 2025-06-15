import { StatusCodes } from "http-status-codes";
import Cart from "../../models/cart.model.js";

// ___________Add Cart Item_________________
export const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cartItemId } = req.body; // ID of the cart item to delete

    if (!cartItemId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "cartItemId is required to delete a cart item.",
      });
    }

    // Find and delete the cart item matching this cart item ID and userId
    const deletedItem = await Cart.findOneAndDelete({
      _id: cartItemId,
      userId,
    });

    if (!deletedItem) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Cart item not found.",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Cart item deleted successfully.",
      deletedItem,
    });
  } catch (error) {
    console.error("Error in deleteCart:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

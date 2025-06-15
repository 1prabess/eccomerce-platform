import { StatusCodes } from "http-status-codes";
import Cart from "../../models/cart.model.js";

// ___________Update Cart Item Quantity_________________
export const updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user._id;

    const { productId, size, newQuantity } = req.body;

    // Validate
    if (!productId || newQuantity < 1)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid product or newQuantity.",
      });

    // Get cart item
    const cartItem = await Cart.findOne({ userId, productId, size }).populate(
      "productId"
    );

    if (!cartItem)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Cart item not found.",
      });

    // Update cart item quantity
    cartItem.quantity = newQuantity;
    await cartItem.save();

    return res.status(StatusCodes.OK).json({
      message: "Cart updated successfully.",
      cartItem,
    });
  } catch (error) {
    console.error("Error in updateCartItemnewQuantity: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

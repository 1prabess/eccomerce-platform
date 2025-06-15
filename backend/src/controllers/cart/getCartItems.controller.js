import { StatusCodes } from "http-status-codes";
import Cart from "../../models/cart.model.js";

// ___________Get All Cart Items_________________
export const getCartItems = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get cart item and also include product details
    const cartItems = await Cart.find({ userId }).populate("productId");

    return res
      .status(StatusCodes.OK)
      .json({ cartItems, message: "Cart fetched successfully!" });
  } catch (error) {
    console.error("Error in getCartItems: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

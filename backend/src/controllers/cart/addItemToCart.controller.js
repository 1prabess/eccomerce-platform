import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";

export const addItemToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let { productId, quantity, size } = req.body;

    // Validate size
    if (!size || typeof size !== "string") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Product size is required." });
    }

    // Default quantity to 1 if invalid
    quantity = Number(quantity);
    if (!quantity || quantity < 1) quantity = 1;

    // Check product exists
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cannot add to cart! - Product not found." });

    // Check if the same product with the same size is already in cart
    let cartItem = await Cart.findOne({ userId, productId, size });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        userId,
        productId,
        quantity,
        size,
        priceAtAddTime: product.price,
      });
      await cartItem.save();
    }

    return res
      .status(StatusCodes.OK)
      .json({ cartItem, message: "Added to cart successfully" });
  } catch (error) {
    console.error("Error in addItemToCart: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

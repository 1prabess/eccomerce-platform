import { StatusCodes } from "http-status-codes";
import Product from "../models/product.model.js";

export const validateOrder = async (req, res, next) => {
  const { products, shippingAddress, paymentMethod = "digital" } = req.body;

  // Validate that products array exists and is not empty
  if (!products || !Array.isArray(products) || products.length === 0)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "At least one product is required." });

  // Validate each product's required fields and their values
  for (const item of products) {
    if (
      !item.productId ||
      item.priceAtPurchase === undefined ||
      item.quantity === undefined
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Each product must include productId, priceAtPurchase, and quantity.",
      });
    }

    if (item.quantity <= 0 || item.priceAtPurchase < 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Product quantity must be > 0 and priceAtPurchase must be >= 0.",
      });
    }
  }

  // Check if each product exists in DB and has enough stock
  for (const item of products) {
    const productInDb = await Product.findById(item.productId);

    if (!productInDb) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Product with ID ${item.productId} not found.`,
      });
    }

    if (productInDb.stock < item.quantity) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Not enough stock for product: ${productInDb.name}`,
      });
    }
  }

  // Validate that shipping address is complete
  if (
    !shippingAddress ||
    !shippingAddress.street ||
    !shippingAddress.city ||
    !shippingAddress.state ||
    !shippingAddress.postalCode ||
    !shippingAddress.country
  )
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Complete shipping address is required." });

  // Validate payment method is either 'digital' or 'cash'
  if (!["digital", "cash"].includes(paymentMethod))
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid payment method." });

  next();
};

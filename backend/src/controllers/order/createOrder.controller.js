import { StatusCodes } from "http-status-codes";
import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";

// ___________Create Order_________________
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      products,
      shippingAddress,
      paymentMethod = "digital",
      notes,
      shippingFee,
    } = req.body;

    // Calculate total price
    let totalPrice = 0;
    products.forEach((item) => {
      totalPrice += item.priceAtPurchase * item.quantity;
    });

    // Add shipping fee
    if (shippingFee) {
      totalPrice += shippingFee;
    } else {
      totalPrice += 10;
    }

    // Enrich products with images using a simple for...of loop
    const enrichedProducts = [];
    for (const item of products) {
      const productFromDb = await Product.findById(item.productId).select(
        "images name"
      );
      enrichedProducts.push({
        ...item,
        name: productFromDb?.name || "Unknown Product",
        images: productFromDb ? productFromDb.images : [],
      });
    }

    const order = new Order({
      userId,
      products: enrichedProducts,
      totalPrice,
      shippingAddress,
      paymentMethod,
      notes,
    });

    await order.save();

    // Decrement stock of product once order is placed
    for (const product of products) {
      const productToDecrement = await Product.findById(product.productId);
      if (productToDecrement) {
        productToDecrement.stock -= product.quantity;
        await productToDecrement.save();
      }
    }

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Order created successfully!", order });
  } catch (error) {
    console.log("Error in createOrder: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

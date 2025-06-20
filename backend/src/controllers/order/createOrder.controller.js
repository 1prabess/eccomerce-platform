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
      paymentMethod = "cash",
      notes,
      shippingFee,
      phone,
      fullName,
      email,
    } = req.body;

    // Validate required fields
    if (!phone || !fullName || !email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Phone, full name, and email are required.",
      });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Products array is required." });
    }

    // Calculate total price
    let totalPrice = 0;
    products.forEach((item) => {
      totalPrice += item.priceAtPurchase * item.quantity;
    });

    // Add shipping fee
    totalPrice += shippingFee || 10;

    // Enrich products with data from DB
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

    // Create order
    const order = new Order({
      userId,
      phone,
      fullName,
      email,
      products: enrichedProducts,
      totalPrice,
      shippingAddress,
      paymentMethod,
      notes,
      shippingFee: shippingFee || 10,
    });

    await order.save();

    // Decrement stock for each product
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
    console.error("Error in createOrder:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

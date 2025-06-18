import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";
import Review from "../../models/review.model.js";
import User from "../../models/user.model.js";
import Order from "../../models/order.model.js";

export const createReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const { rating, comment } = req.body;

    // Validate required fields
    if (!productId || !rating) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Product ID and rating are required.",
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Product not found.",
      });
    }

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "You have already reviewed this product.",
      });
    }

    // Check if user has purchased this product (order must be delivered)
    const hasPurchased = await Order.exists({
      userId,
      orderStatus: "delivered",
      "products.productId": productId,
    });

    if (!hasPurchased) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message:
          "Only customers who have purchased this product can leave a review.",
      });
    }

    // Get user info (for user name in review)
    const user = await User.findById(userId);

    // Create review
    const review = new Review({
      userId,
      user: user.fullName,
      productId,
      rating,
      comment,
    });

    await review.save();

    // Update product with new review info
    product.reviews.push(review._id);
    product.numReviews += 1;

    // Recalculate average rating
    const allReviews = await Review.find({ productId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    product.ratings = totalRating / allReviews.length;

    await product.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Review created successfully!",
      review,
    });
  } catch (error) {
    console.error("Error in createReview:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

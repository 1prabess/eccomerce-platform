import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";
import Review from "../../models/review.model.js";
import User from "../../models/user.model.js";

// ___________Create Review_________________
export const createReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const { rating, comment } = req.body;

    // Check if required fields are present
    if (!productId || !rating)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Product ID and rating are required.",
      });

    const product = await Product.findById(productId);

    if (!product)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Product not found.",
      });

    // Get user details
    const user = await User.findById(userId);

    // Check if there is already existing review left by the user
    const existingReview = await Review.findOne({ productId, userId });

    if (existingReview)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "You have already reviewed this product.",
      });

    const review = new Review({
      userId,
      user: user.fullName,
      productId,
      rating,
      comment,
    });

    await review.save();

    // Add review in product
    product.reviews.push(review._id);

    // Increase review count
    product.numReviews += 1;

    // Add average ratings
    const allReviews = await Review.find({ productId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    product.ratings = totalRating / allReviews.length;

    await product.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Review created successfully!",
      review,
    });
  } catch (error) {
    console.log("Error in createReview: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

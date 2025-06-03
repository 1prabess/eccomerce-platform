import { StatusCodes } from "http-status-codes";
import Review from "../../models/review.model.js";

// ___________Get Reviews_________________
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const { rating } = req.query;

    let query = {
      productId,
    };

    if (rating && rating != "all") query.rating = rating;

    // Check if productId is given or not
    if (!productId)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Product ID is required.",
      });

    // Fetch reviews
    const reviews = await Review.find(query);

    return res.status(StatusCodes.OK).json({
      message: "Reviews fetched successfully!",
      reviews,
    });
  } catch (error) {
    console.log("Error in getReviews: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

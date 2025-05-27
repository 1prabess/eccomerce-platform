import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";

// ___________Get Product_________________
export const getProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Slug is required." });

    // Find the product with slug
    const product = await Product.findOne({ slug });

    if (!product)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No product found." });

    return res.status(StatusCodes.OK).json({
      product,
    });
  } catch (error) {
    console.log("Error in getProduct: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

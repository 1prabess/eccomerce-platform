import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";

// ___________Get Product_________________
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Slug or Product ID is required." });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No product found." });
    }

    return res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    console.log("Error in getProduct: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

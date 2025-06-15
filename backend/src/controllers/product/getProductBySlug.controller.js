import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";

// ___________Get Product_________________
export const getProductBySlug = async (req, res) => {
  try {
    const { slug, productId } = req.params;

    if (!slug && !productId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Slug or Product ID is required." });
    }

    let product;

    if (slug) {
      product = await Product.findOne({ slug });
    } else if (productId) {
      product = await Product.findById(productId);
    }

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

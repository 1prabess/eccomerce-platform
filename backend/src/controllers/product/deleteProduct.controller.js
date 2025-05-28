import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";
import mongoose from "mongoose";

// ___________Delete Product_________________
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the id from params is mongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid product ID." });
    }

    // Find the product and delete it
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No product found." });

    return res.status(StatusCodes.OK).json({
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.log("Error in deleteProduct: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

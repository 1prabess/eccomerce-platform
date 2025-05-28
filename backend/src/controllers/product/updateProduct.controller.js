import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";
import slugify from "slugify";
import mongoose from "mongoose";

// ___________Update Product_________________
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if the id from params is mongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid product ID." });
    }

    if (!updateData)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "New information is required." });

    // Check if the name is to be updated -- generate new slug if yes
    if (updateData.name)
      updateData.slug = slugify(updateData.name, { lower: true, strict: true });

    // Find the product and update it
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated data
      runValidators: true, // Validate against schema
    });

    if (!updatedProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found." });
    }

    return res.status(StatusCodes.OK).json({
      message: "Product updated successfully!",
      updatedProduct,
    });
  } catch (error) {
    console.log("Error in updateProduct: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

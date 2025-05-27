import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";

// ___________Create Product_________________
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      discount = 0,
      images = [],
      colors = [],
      isFeatured = false,
      stock,
    } = req.body;

    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !subCategory ||
      !Array.isArray(sizes) ||
      sizes.length === 0 ||
      stock === undefined
    )
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required." });

    const product = new Product({
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      isFeatured,
      stock,
      discount,
      images,
      colors,
    });

    await product.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    console.log("Error in createProduct: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

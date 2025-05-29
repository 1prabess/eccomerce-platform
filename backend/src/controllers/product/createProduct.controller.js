import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";
import slugify from "slugify";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

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
      colors = [],
      isFeatured = false,
      stock,
    } = req.body;

    let parsedSizes;

    try {
      parsedSizes = JSON.parse(sizes);
    } catch (e) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Sizes must be an array." });
    }

    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !subCategory ||
      !Array.isArray(parsedSizes) ||
      parsedSizes.length === 0 ||
      stock === undefined
    )
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required." });

    // Upload images to Cloudinary
    let uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        uploadedImages.push(result.secure_url);

        // Delete temp file after upload
        fs.unlinkSync(file.path);
      }
    }

    // Generate slug and attach unique suffix
    const baseSlug = slugify(name, { lower: true, strict: true });
    const uniqueSuffix = Math.random().toString(36).substring(2, 6);
    const slug = `${baseSlug}-${uniqueSuffix}`;

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
      images: uploadedImages,
      colors,
      slug,
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

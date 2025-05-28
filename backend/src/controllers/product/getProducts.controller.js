import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";

// ___________Get Products_________________
export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { category, subCategory } = req.query;

    const skip = (page - 1) / limit;

    let filters = {};

    if (category) filters.category = category;
    if (subCategory) filters.subCategory = subCategory;

    const products = await Product.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments();

    return res.status(StatusCodes.OK).json({
      message: "Products fetched successfully!",
      products,
      pagination: {
        totalItems: totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        perPage: limit,
        hasNextPage: page * limit < totalProducts,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.log("Error in getProduct: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

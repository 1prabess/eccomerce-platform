import { StatusCodes } from "http-status-codes";
import Product from "../../models/product.model.js";

// ___________Get Products_________________
export const getProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10, category, subCategory } = req.query;

    page = Number(page) || 1;

    const isGetAll = limit === "all";
    limit = isGetAll ? null : Number(limit);

    const skip = isGetAll ? null : (page - 1) * limit;

    let filters = {};
    if (category) filters.category = category;
    if (subCategory) filters.subCategory = subCategory;

    let products;
    let totalProducts;

    if (isGetAll) {
      products = await Product.find(filters).sort({ createdAt: -1 });
      totalProducts = products.length;
    } else {
      // Get products by applying filters and sorting
      products = await Product.find(filters)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      // Get the total number of products
      totalProducts = await Product.countDocuments(filters);
    }

    // Prepare common response
    const response = {
      message: "Products fetched successfully!",
      products,
    };

    // Attach pagination only if the user does not want all orders
    if (!isGetAll)
      response.pagination = {
        totalItems: totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        perPage: limit,
        hasNextPage: page * limit < totalProducts,
        hasPrevPage: page > 1,
      };

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.log("Error in getProducts: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

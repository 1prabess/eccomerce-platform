import { StatusCodes } from "http-status-codes";
import Order from "../../models/order.model.js";

// ___________Get My Orders_________________
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    let {
      page = 1,
      limit = 10,
      orderStatus,
      paymentStatus,
      category,
      subCategory,
    } = req.query;

    page = Number(page);

    // Check if the user wants to get all orders
    const isGetAll = limit === "all";
    limit = isGetAll ? null : Number(limit);

    const skip = isGetAll ? 0 : (page - 1) * limit;

    let filters = {};
    filters.userId = userId;
    if (category) filters.category = category;
    if (subCategory) filters.subCategory = subCategory;
    if (orderStatus) filters.orderStatus = orderStatus;
    if (paymentStatus) filters.paymentStatus = paymentStatus;

    let orders;
    let totalOrders;

    if (isGetAll) {
      // Get orders without skipping and limit
      orders = await Order.find(filters).sort({ createdAt: -1 });
      // Get total number of orders
      totalOrders = orders.length;
    } else {
      // Get orders
      orders = await Order.find(filters)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      // Get total number of orders
      totalOrders = await Order.countDocuments(filters);
    }

    // Prepare common response
    const response = {
      message: "Orders fetched successfully!",
      orders,
    };

    // Attach pagination only if the user does not want all orders
    if (!isGetAll)
      response.pagination = {
        totalItems: totalOrders,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        perPage: limit,
        hasNextPage: page * limit < totalOrders,
        hasPrevPage: page > 1,
      };

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.log("Error in getMyOrders: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

import { axiosInstance } from "@/lib/axios";

export const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post("/orders", orderData);
    return response.data.data.order;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders/my");
    return response.data.data.orders;
  } catch (error) {
    throw error;
  }
};

export const getAllOrders = async ({
  limit,
  paymentStatus,
  page,
  orderStatus,
  category,
  subCategory,
}) => {
  try {
    let params = {};

    if (limit) params.limit = limit;
    if (paymentStatus) params.paymentStatus = paymentStatus;
    if (page) params.page = page;
    if (orderStatus) params.orderStatus = orderStatus;
    if (category) params.category = category;
    if (subCategory) params.subCategory = subCategory;

    const response = await axiosInstance.get("/orders", { params });
    return response.data.data.orders;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (data) => {
  try {
    const { orderID, updateData } = data;

    const response = await axiosInstance.patch(
      `/orders/${orderID}/status`,
      updateData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderPaymentStatus = async (data) => {
  try {
    const { orderID, updateData } = data;

    const response = await axiosInstance.patch(
      `/orders/${orderID}/payment-status`,
      updateData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

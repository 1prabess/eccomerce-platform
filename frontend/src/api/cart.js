import { axiosInstance } from "@/lib/axios";

export const addItemToCart = async (data) => {
  try {
    const response = await axiosInstance.post("/cart", data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getCartItems = async () => {
  try {
    const response = await axiosInstance.get("/cart");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateItemQuantity = async (updateData) => {
  try {
    const response = await axiosInstance.patch("/cart/update", updateData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const response = await axiosInstance.delete("/cart/deleteItem", {
      data: { cartItemId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const resetCart = async () => {
  try {
    const response = await axiosInstance.delete("/cart");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

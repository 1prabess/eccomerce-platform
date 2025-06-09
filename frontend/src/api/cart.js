import { axiosInstance } from "@/lib/axios";

export const getCartItems = async () => {
  try {
    const response = await axiosInstance.get("/cart");

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch cart item",
    );
  }
};

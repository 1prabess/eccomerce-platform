import { axiosInstance } from "@/lib/axios";

export const getProducts = async ({ limit, category, subCategory, page }) => {
  try {
    let params = {};
    if (limit) params.limit = limit;
    if (category) params.category = category.toLowerCase();
    if (subCategory) params.subCategory = subCategory.toLowerCase();
    if (page) params.page = page;

    const response = await axiosInstance.get("/products", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products",
    );
  }
};

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

export const getProduct = async (productSlug) => {
  try {
    const response = await axiosInstance.get(`/products/${productSlug}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
};

export const getReviews = async (productId, rating) => {
  try {
    let params = {};

    if (rating) params.rating = rating;

    const response = await axiosInstance.get(`/products/${productId}/reviews`, {
      params,
    });
    return response.data.data.reviews;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch reviews");
  }
};

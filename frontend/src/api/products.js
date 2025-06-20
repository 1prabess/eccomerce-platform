import { axiosInstance } from "@/lib/axios";

export const getProducts = async ({ limit, category, subCategory, page }) => {
  try {
    let params = {};
    if (limit) params.limit = limit;
    if (category) params.category = category.toLowerCase();
    if (subCategory) params.subCategory = subCategory.toLowerCase();
    if (page) params.page = page;

    const response = await axiosInstance.get("/products", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (productSlug) => {
  try {
    const response = await axiosInstance.get(`/products/${productSlug}`);
    return response.data.data;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("/products", productData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productID) => {
  try {
    const response = await axiosInstance.delete(`/products/${productID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (data) => {
  try {
    const { productID, updateData } = data;

    const response = await axiosInstance.patch(
      `/products/${productID}`,
      updateData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReview = async (data) => {
  try {
    const { productID, review } = data;

    const response = await axiosInstance.post(
      `/products/${productID}/reviews`,
      review,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

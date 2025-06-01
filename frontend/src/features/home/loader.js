import { axiosInstance } from "@/lib/axios";

export const collectionLoader = async (req, res) => {
  try {
    const res = await axiosInstance.get("/products?limit=6");
    return res.data.data;
  } catch (error) {
    console.error("Error loading collections:", error);
  }
};

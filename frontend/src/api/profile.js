import { axiosInstance } from "@/lib/axios";

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to fetch reviews");
  }
};

export const updateProfile = async (updateData) => {
  try {
    console.log(updateData);
    const response = await axiosInstance.patch("/user/profile", {
      address: {
        ...updateData,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Failed to fetch reviews");
  }
};

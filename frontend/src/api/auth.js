import { axiosInstance } from "@/lib/axios";

export const signin = async (creds) => {
  try {
    const response = await axiosInstance.post("/auth/signin", creds);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (creds) => {
  try {
    const response = await axiosInstance.post("/auth/signup", creds);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const adminSignup = async (creds) => {
  try {
    const response = await axiosInstance.post("/auth/admin/signup", creds);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const verifyAccount = async (code) => {
  try {
    const response = await axiosInstance.post(`/auth/verify-account/${code}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async ({ resetPasswordToken, password }) => {
  try {
    const response = await axiosInstance.post(
      `/auth/reset-password/${resetPasswordToken}`,
      {
        newPassword: password,
      },
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data.message;
  } catch (error) {
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get("/auth/check-auth");

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

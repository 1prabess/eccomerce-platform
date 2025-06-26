import { axiosInstance } from "@/lib/axios";

export const initiatePayment = async (payload) => {
  try {
    const orderID = payload.orderID;
    sessionStorage.setItem("current_transaction_id", orderID);

    const response = await axiosInstance.post("/payment/initiate", {
      ...payload,
      orderID,
    });

    if (!response.data?.data?.url) {
      throw new Error("Payment URL is missing in the response");
    }

    return response.data.data.url;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};

export async function markPaymentAsFailed(product_id) {
  try {
    const response = await axiosInstance.post("/payment/status", {
      product_id,
      status: "FAILED",
    });
    return response.data;
  } catch (error) {
    console.error("Error marking payment as failed:", error);
    throw error;
  }
}

export async function verifyPaymentAndUpdateStatus({ order_id, pidx }) {
  try {
    const response = await axiosInstance.post("/payment/status", {
      order_id,
      pidx,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error verifying payment status:", error);
    throw error;
  }
}

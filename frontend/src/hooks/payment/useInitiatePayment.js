import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { initiatePayment } from "@/api/payment";

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: initiatePayment,
    onSuccess: (paymentUrl) => {
      toast.success("Redirecting to payment...");
      window.location.href = paymentUrl;
    },
    onError: (error) => {
      console.error("Payment initiation failed:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Payment failed",
      );
    },
  });
};

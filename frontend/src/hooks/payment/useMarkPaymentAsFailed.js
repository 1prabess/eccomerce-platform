import { useMutation } from "@tanstack/react-query";
import { markPaymentAsFailed } from "@/api/payment";

export const useMarkPaymentAsFailed = () => {
  return useMutation({
    mutationFn: markPaymentAsFailed,
    onError: (error) => {
      console.error("Error updating payment status:", error);
    },
  });
};

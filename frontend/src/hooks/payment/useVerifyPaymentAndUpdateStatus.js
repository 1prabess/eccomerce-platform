import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUpdateOrderPaymentStatus } from "@/hooks/order/useUpdateOrderPaymentStatus";
import { verifyPaymentAndUpdateStatus } from "@/api/payment";

export const useVerifyPaymentAndUpdateStatus = () => {
  const navigate = useNavigate();
  const { mutate: updateStatus } = useUpdateOrderPaymentStatus();

  return useMutation({
    mutationFn: verifyPaymentAndUpdateStatus,
    onSuccess: (data, variables) => {
      if (data.paymentStatus === "COMPLETED") {
        updateStatus({
          orderID: variables.order_id,
          updateData: { paymentStatus: "COMPLETED" },
        });
      } else {
        navigate("/payment-failure", {
          search: `?purchase_order_id=${variables.order_id}`,
        });
      }
    },
    onError: (error, variables) => {
      console.error("Payment verification failed:", error);
      navigate("/payment-failure", {
        search: `?purchase_order_id=${variables.order_id}`,
      });
    },
  });
};

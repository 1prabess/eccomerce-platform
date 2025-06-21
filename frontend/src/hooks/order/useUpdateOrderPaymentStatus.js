import { updateOrderPaymentStatus } from "@/api/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateOrderPaymentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateOrderPaymentStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => toast.error(error?.response?.data?.message),
  });
};

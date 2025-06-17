import { updateOrderStatus } from "@/api/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateOrderStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["order"]);
      toast.success("Order status updated successfully!");
    },
    onError: (error) => toast.error(error?.response?.data?.message),
  });
};

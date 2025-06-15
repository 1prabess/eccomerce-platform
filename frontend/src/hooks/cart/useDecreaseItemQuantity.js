import { updateItemQuantity } from "@/api/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDecreaseItemQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateData) => updateItemQuantity(updateData),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (error) => toast.error(error?.response?.data?.message),
  });
};

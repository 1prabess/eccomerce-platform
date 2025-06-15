import { deleteCartItem } from "@/api/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cartItemId) => deleteCartItem(cartItemId),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (error) => toast.error(error?.response?.data?.message),
  });
};

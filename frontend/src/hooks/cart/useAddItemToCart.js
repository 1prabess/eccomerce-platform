import { addItemToCart } from "@/api/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addItemToCart(data),
    onSuccess: () => {
      toast.success("Product added to cart!");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => toast.error(error?.response?.data?.message),
  });
};

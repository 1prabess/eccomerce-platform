import { resetCart } from "@/api/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useResetCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => resetCart(),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });
};

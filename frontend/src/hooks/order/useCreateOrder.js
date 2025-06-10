import { createOrder } from "@/api/order";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useResetCart } from "../cart/useResetCart";

export const useCreateOrder = () => {
  const { mutate: resetCart } = useResetCart();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      resetCart();
      toast.success("Order placed successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Order failed. Try again.");
    },
  });
};

import { createOrder } from "@/api/order";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useResetCart } from "../cart/useResetCart";
import { useInitiatePayment } from "../payment/useInitiatePayment";

export const useCreateOrder = () => {
  const { mutate: resetCart } = useResetCart();
  const { mutate: initiatePayment } = useInitiatePayment();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      resetCart();
      toast.success("Order placed successfully!");
      if (order.paymentMethod === "esewa") {
        const paymentData = {
          orderId: order._id,
          customerName: order.fullName,
          customerEmail: order.email,
          customerPhone: order.phone,
          amount: order.totalPrice,
          paymentGateway: "esewa",
        };

        initiatePayment(paymentData);
      }

      if (order.paymentMethod === "khalti") {
        const paymentData = {
          orderId: order._id,
          customerName: order.fullName,
          customerEmail: order.email,
          customerPhone: order.phone,
          amount: order.totalPrice,
          paymentGateway: "khalti",
        };

        initiatePayment(paymentData);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Order failed. Try again.");
    },
  });
};

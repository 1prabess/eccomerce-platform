import { getCartItems } from "@/api/cart";
import { useQuery } from "@tanstack/react-query";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartItems(),
  });
};

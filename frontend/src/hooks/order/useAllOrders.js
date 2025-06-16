import { getAllOrders } from "@/api/order";
import { useQuery } from "@tanstack/react-query";

export const useAllOrders = (filters) => {
  return useQuery({
    queryKey: ["allOrders", filters],
    queryFn: () => getAllOrders(filters),
  });
};

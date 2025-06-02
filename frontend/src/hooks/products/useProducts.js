import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (options = {}) => {
  return useQuery({
    queryKey: ["products", options],
    queryFn: () => getProducts(options),
  });
};

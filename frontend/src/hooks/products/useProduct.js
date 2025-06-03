import { getProduct } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (productSlug) => {
  return useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => getProduct(productSlug),
  });
};

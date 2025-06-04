import { getReviews } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export const useReviews = (productId, rating) => {
  return useQuery({
    queryKey: ["reviews", productId, rating],
    queryFn: () => getReviews(productId, rating),
    enabled: !!productId,
  });
};

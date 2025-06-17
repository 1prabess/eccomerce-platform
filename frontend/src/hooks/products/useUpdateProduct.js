import { updateProduct } from "@/api/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
      toast.success("Product updated successfully!");
    },
    onError: (error) => toast.error(error?.response?.data?.message),
  });
};

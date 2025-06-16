import { createProduct } from "@/api/products";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (productData) => createProduct(productData),
    onSuccess: () => {
      toast.success("Product created successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Product creation failed. Try again.",
      );
    },
  });
};

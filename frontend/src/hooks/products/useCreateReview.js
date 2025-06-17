import { createReview } from "@/api/products";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateReview = () => {
  return useMutation({
    mutationFn: (data) => createReview(data),
    onSuccess: () => {
      toast.success("Review submitted successfully!");
    },
    onError: (error) => toast.error(error?.response?.data?.message),
  });
};

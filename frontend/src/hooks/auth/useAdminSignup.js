import { adminSignup } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAdminSignup = () => {
  return useMutation({
    mutationFn: (creds) => adminSignup(creds),
    onSuccess: () => {
      toast.success("Admin created successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

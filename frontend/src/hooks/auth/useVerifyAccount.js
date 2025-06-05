import { verifyAccount } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: (code) => verifyAccount(code),
    onSuccess: () => {
      toast.success("Account verified successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

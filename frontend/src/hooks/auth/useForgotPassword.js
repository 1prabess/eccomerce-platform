import { forgotPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email) => forgotPassword(email),
    onSuccess: () => {
      toast.success("Reset password link sent");
    },
    onError: () => {
      toast.error(error?.response?.data?.message);
    },
  });
};

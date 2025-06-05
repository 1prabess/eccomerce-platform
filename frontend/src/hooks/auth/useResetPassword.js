import { resetPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ resetPasswordToken, password }) =>
      resetPassword({ resetPasswordToken, password }),
    onSuccess: () => {
      toast.success("Password reset successfull!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

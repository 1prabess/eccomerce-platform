import { signin } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSignin = () => {
  return useMutation({
    mutationFn: (creds) => signin(creds),
    onSuccess: () => {
      toast.success("Logged in successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

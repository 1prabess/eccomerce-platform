import { signup } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (creds) => signup(creds),
    onSuccess: () => {
      navigate("/verify-account");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

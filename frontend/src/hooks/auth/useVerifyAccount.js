import { verifyAccount } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useVerifyAccount = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code) => verifyAccount(code),
    onSuccess: () => {
      navigate("/");
      toast.success("Account verified successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

import { signin } from "@/api/auth";
import { setUser } from "@/store/authSlice";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useSignin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (creds) => signin(creds),
    onSuccess: (user) => {
      dispatch(setUser(user.user));
      toast.success("Logged in successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

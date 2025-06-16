import { logout } from "@/api/auth";
import { clearUser } from "@/store/authSlice";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      dispatch(clearUser());
      toast.success("Logged out successfully");
    },
    onError: (error) => toast.error(error?.response?.data?.message),
  });
};

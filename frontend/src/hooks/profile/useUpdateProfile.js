import { updateProfile } from "@/api/profile";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (updateData) => updateProfile(updateData),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

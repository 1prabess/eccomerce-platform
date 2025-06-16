import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/api/auth";

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => checkAuth(),
  });
};

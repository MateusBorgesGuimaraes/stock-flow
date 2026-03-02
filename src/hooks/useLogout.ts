import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/auth.service";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function useLogout() {
  const clearUser = useAuthStore((state) => state.clearUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearUser();
      navigate({ to: "/login" });
      toast.success("Logout realizado com sucesso");
    },
    onError: () => {
      clearUser();
      navigate({ to: "/login" });
    },
  });
}

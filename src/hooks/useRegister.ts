import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/auth.service";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";

export function useRegister() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setUser(data.user);
      if (!data.user.companyId) {
        navigate({ to: "/criar-empresa" });
      } else {
        navigate({ to: "/dashboard" });
      }
    },

    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Erro ao criar conta");
      }
    },
  });
}

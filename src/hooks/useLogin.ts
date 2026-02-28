import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.service";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      localStorage.setItem("accesToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setUser(data.user);
      navigate({ to: "/" });
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Erro ao fazer login");
      }
    },
  });
}

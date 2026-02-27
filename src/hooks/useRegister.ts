import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/auth.service";

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // redirecionar para home, atualizar contexto, etc.
    },

    onError: (error: any) => {
      console.error("Erro no cadastro:", error?.response?.data?.message);
      //toat com erro
    },
  });
}

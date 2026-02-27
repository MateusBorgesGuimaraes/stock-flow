import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.service";

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accesToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // fazer redirecionamento, atualizar context de auth
    },
    onError: (error) => {
      console.error("Erro no login;", error);
      // toast mostrando que deu erro
    },
  });
}

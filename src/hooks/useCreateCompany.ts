import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";
import { createCompany } from "../services/company.service";
import { useAuthStore } from "../stores/useAuthStore";

export function useCreateCompany() {
  const updateCompanyId = useAuthStore((state) => state.updateCompanyId);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      updateCompanyId(data.id);

      toast.success("Empresa criada com sucesso! 🎉");

      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Erro ao criar empresa");
      }
    },
  });
}

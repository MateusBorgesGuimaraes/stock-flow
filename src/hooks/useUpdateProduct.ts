import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";
import { updateProduct } from "../services/product.service";
import type { ProductFormData } from "../schemas/product.schema";

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ProductFormData) => updateProduct(id, payload),
    onSuccess: () => {
      toast.success("Produto atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stock-alerts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-movements"] });
      navigate({ to: "/produtos", search: { page: "1" } });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Erro ao atualizar produto",
        );
      }
    },
  });
}

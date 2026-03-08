import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { deleteProduct } from "../services/product.service";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),

    onSuccess: (id) => {
      toast.success("Produto excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stock-alerts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-movements"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Erro ao excluir produto");
      }
    },
  });
}

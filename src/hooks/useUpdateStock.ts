import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { updateStock, type UpdateStockDto } from "../services/product.service";

export function useUpdateStock(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateStockDto) => updateStock(id, dto),
    onSuccess: () => {
      toast.success("Estoque atualizado!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stock-alerts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-movements"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Erro ao atualizar estoque",
        );
      }
    },
  });
}

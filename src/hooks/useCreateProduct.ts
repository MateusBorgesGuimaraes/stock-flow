import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";
import { createProduct } from "../services/product.service";

export function useCreateProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Produto criado com sucesso! 🎉");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate({
        to: "/produtos",
        search: { page: "1" },
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Erro ao criar produto");
      }
    },
  });
}

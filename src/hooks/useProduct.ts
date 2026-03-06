import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../services/product.service";

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
}

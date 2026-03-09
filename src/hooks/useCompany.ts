import { useQuery } from "@tanstack/react-query";
import { fetchMyCompany } from "../services/company.service";

export function useCompany() {
  return useQuery({
    queryKey: ["company"],
    queryFn: fetchMyCompany,
  });
}

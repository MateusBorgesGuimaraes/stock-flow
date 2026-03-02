import type { CompanyFormData } from "../schemas/company.schema";
import { api } from "./api";

export async function createCompany(payload: CompanyFormData) {
  const { data } = await api.post("/companies", payload);
  return data;
}

import { z } from "zod";

export const companySchema = z.object({
  name: z
    .string()
    .min(2, "Nome da empresa deve ter pelo menos 2 caracteres")
    .max(100, "Nome da empresa deve ter no máximo 100 caracteres"),
});

export type CompanyFormData = z.infer<typeof companySchema>;

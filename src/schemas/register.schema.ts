import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),

  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),

  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),

  terms: z.boolean().refine((value) => value === true, {
    message: "Você precisa aceitar os termos de uso",
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Formato de email inválido"),

  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),

  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

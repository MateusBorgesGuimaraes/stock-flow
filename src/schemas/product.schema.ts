import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(150),
  description: z.string().max(500).optional(),
  price: z.number().positive("Preço deve ser maior que zero"),
  quantity: z.number().int().min(0, "Quantidade não pode ser negativa"),
  lowStockThreshold: z.number().int().min(0).optional(),
  category: z.string().max(50).optional(),
  sku: z.string().max(50).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

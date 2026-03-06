import { createFileRoute } from "@tanstack/react-router";
import { Produtos } from "../../../../components/pages/authenticated/produtos";

import { z } from "zod";

const produtosSearchSchema = z.object({
  page: z.string().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  lowStock: z.string().optional(),
  sortBy: z.string().optional(),
  order: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/_has-company/produtos/")({
  validateSearch: produtosSearchSchema,
  component: Produtos,
});

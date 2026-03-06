import { createFileRoute } from "@tanstack/react-router";
import { NovoProduto } from "../../../../components/pages/authenticated/novoProduto";

export const Route = createFileRoute(
  "/_authenticated/_has-company/produtos/novo",
)({
  component: NovoProduto,
});

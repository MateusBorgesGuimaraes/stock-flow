import { createFileRoute } from "@tanstack/react-router";
import { EditarProduto } from "../../../../components/pages/authenticated/editarProduto";

export const Route = createFileRoute(
  "/_authenticated/_has-company/produtos/$id",
)({
  component: EditarProduto,
});

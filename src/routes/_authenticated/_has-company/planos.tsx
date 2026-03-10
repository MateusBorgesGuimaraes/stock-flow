import { createFileRoute } from "@tanstack/react-router";
import { Planos } from "../../../components/pages/authenticated/planos";

export const Route = createFileRoute("/_authenticated/_has-company/planos")({
  component: Planos,
});

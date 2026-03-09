import { createFileRoute } from "@tanstack/react-router";
import { Empresa } from "../../../components/pages/authenticated/empresa";

export const Route = createFileRoute("/_authenticated/_has-company/empresa")({
  component: Empresa,
});

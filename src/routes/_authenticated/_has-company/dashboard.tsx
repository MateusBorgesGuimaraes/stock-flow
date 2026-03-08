import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "../../../components/pages/authenticated/dashboard";

export const Route = createFileRoute("/_authenticated/_has-company/dashboard")({
  component: Dashboard,
});

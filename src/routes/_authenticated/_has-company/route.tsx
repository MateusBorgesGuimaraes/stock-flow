import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../../../stores/useAuthStore";
import { AppLayout } from "../../../components/layout/appLayout";

export const Route = createFileRoute("/_authenticated/_has-company")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();

    if (!user?.companyId) {
      throw redirect({
        to: "/criar-empresa",
      });
    }
  },
  component: AppLayout,
});

import { createFileRoute, redirect } from "@tanstack/react-router";
import { CriarEmpresa } from "../../components/pages/authenticated/criarEmpresa";
import { useAuthStore } from "../../stores/useAuthStore";

export const Route = createFileRoute("/_authenticated/criar-empresa")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();

    if (user?.companyId) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: CriarEmpresa,
});

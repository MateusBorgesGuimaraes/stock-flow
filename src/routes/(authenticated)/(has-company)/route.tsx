import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../../../stores/useAuthStore";
import Sidebar from "../../../components/layout/Sidebar";

export const Route = createFileRoute("/(authenticated)/(has-company)")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState();

    if (!user?.companyId) {
      throw redirect({
        to: "/criar-empresa",
      });
    }
  },
  component: () => (
    <div style={{ display: "flex", height: "100dvh", overflow: "hidden" }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  ),
});

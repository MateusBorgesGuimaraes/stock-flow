import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/useAuthStore";

export const Route = createFileRoute("/(authenticated)")({
  beforeLoad: ({ location }) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => <Outlet />,
});

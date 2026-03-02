import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/useAuthStore";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <div className="app-bg" />
      <Outlet />
      <Footer />
    </>
  ),
});

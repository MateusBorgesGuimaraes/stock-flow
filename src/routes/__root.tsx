import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      {/*<h1>StockFlow</h1>*/}
      <Outlet />
    </>
  ),
});

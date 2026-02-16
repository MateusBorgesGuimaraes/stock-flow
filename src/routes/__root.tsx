import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <h1>StockFlow</h1>
      <Outlet />
    </>
  ),
});

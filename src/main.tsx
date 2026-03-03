import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { router } from "./router";
import { ThemeProvider } from "./context/themeProvider";
import { setupInterceptors } from "./lib/axios-interceptors";
import { useAuthStore } from "./stores/useAuthStore";
import "./styles/reset.css";
import "./styles/global.css";
import { AuthGuard } from "./components/layout/authGuard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    setupInterceptors(clearUser);
  }, [clearUser]);

  return (
    <AuthGuard>
      <ThemeProvider>
        <Toaster position="top-right" richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthGuard>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);

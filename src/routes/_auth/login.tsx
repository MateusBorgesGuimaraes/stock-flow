import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "../../components/layout/authLayout";
import { AuthVisual } from "../../components/pages/auth/authVisual";
import { LoginForm } from "../../components/pages/auth/loginForm";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout
      visualContent={
        <AuthVisual
          icon="📦"
          title="Gerencie seu estoque com inteligência"
          text="Mais de 500 empresas já confiam no StockFlow para organizar seu inventário e tomar decisões mais rápidas."
          stats={[
            { value: "500+", label: "Empresas" },
            { value: "12K", label: "Produtos" },
            { value: "98%", label: "Satisfação" },
          ]}
        />
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}

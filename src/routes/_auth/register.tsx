import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "../../components/layout/authLayout";
import { AuthVisual } from "../../components/pages/auth/authVisual";
import { RegisterForm } from "../../components/pages/auth/registerForm";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout
      visualContent={
        <AuthVisual
          icon="🚀"
          title="Comece grátis em menos de 2 minutos"
          text="Sem cartão de crédito. Sem complicação. Cadastre-se e comece a organizar seu estoque hoje mesmo."
          stats={[
            { value: "Grátis", label: "Plano FREE" },
            { value: "20", label: "Produtos" },
            { value: "2min", label: "Setup" },
          ]}
        />
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}

import type { PricingPlan } from "../../../../utils/types";
import PricingCard from "../../../ui/pricingCard/pricingCard";
import SectionBadge from "../../../ui/sectionBadge";
import styles from "./styles.module.css";

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: { amount: "Grátis" },
    limit: "Até <strong>20 produtos</strong>",
    features: [
      "Dashboard básico",
      "Cadastro de produtos",
      "Controle de estoque",
      "Alertas de estoque baixo",
      "Padrão no cadastro",
      "Suporte por email",
    ],
    cta: "Começar grátis",
    note: "Sem cartão de crédito",
    variant: "secondary",
  },
  {
    name: "Deluxe",
    price: {
      currency: "R$",
      amount: "29",
      period: ",90/mês",
    },
    limit: "Até <strong>100 produtos</strong>",
    features: [
      "Tudo do plano Free",
      "Até 100 produtos",
      "Relatórios básicos",
      "Histórico de movimentações",
      "Pagamento via checkout",
      "Suporte prioritário",
    ],
    cta: "Assinar Deluxe",
    note: "Cancele quando quiser",
    variant: "primary",
  },
  {
    name: "Premium",
    price: {
      currency: "R$",
      amount: "99",
      period: ",90/mês",
    },
    limit: "<strong>Produtos ilimitados</strong>",
    features: [
      "Tudo do plano Deluxe",
      "Produtos ilimitados",
      "Relatórios avançados",
      "Múltiplos usuários",
      "Exportação de dados",
      "Integrações (API)",
      "Pagamento via checkout",
      "Suporte VIP 24/7",
    ],
    cta: "Assinar Premium",
    note: "Teste 14 dias grátis",
    featured: true,
    variant: "primary",
  },
];

export default function Pricing() {
  return (
    <section className={styles.pricing}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <SectionBadge>Preços</SectionBadge>
        </div>

        <h2 className={styles.sectionTitle}>
          Escolha o plano ideal
          <br />
          para o seu negócio
        </h2>

        <p className={styles.sectionSubtitle}>
          Comece grátis e escale conforme sua necessidade. Sem taxas ocultas,
          sem surpresas.
        </p>
      </div>

      <div className={styles.pricingGrid}>
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
}

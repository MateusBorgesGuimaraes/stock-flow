import ButtonLink from "../../../ui/buttonLink";
import SectionBadge from "../../../ui/sectionBadge";
import styles from "./styles.module.css";

type Feature = {
  icon: string;
  title: string;
  description: string;
  linkText: string;
};

const features: Feature[] = [
  {
    icon: "📊",
    title: "Dashboard em tempo real",
    description:
      "Visualize métricas essenciais num só lugar. Estoque atual, produtos em baixa, movimentações recentes — tudo atualizado instantaneamente.",
    linkText: "Ver demo →",
  },
  {
    icon: "⚡",
    title: "Alertas inteligentes",
    description:
      "Receba notificações automáticas quando produtos atingirem o estoque mínimo. Nunca mais perca vendas por falta de produto.",
    linkText: "Saiba mais →",
  },
  {
    icon: "📱",
    title: "Acesso mobile",
    description:
      "Gerencie seu estoque de qualquer lugar. Interface responsiva que funciona perfeitamente em smartphones e tablets.",
    linkText: "Experimente →",
  },
  {
    icon: "📈",
    title: "Relatórios detalhados",
    description:
      "Acompanhe tendências, giro de estoque e performance de produtos. Relatórios visuais que facilitam a tomada de decisão.",
    linkText: "Ver exemplos →",
  },
  {
    icon: "🔄",
    title: "Histórico completo",
    description:
      "Todas as movimentações registradas. Entradas, saídas, ajustes — rastreabilidade total do seu estoque.",
    linkText: "Entenda como →",
  },
  {
    icon: "🚀",
    title: "Setup rápido",
    description:
      "Comece em menos de 2 minutos. Interface intuitiva que não requer treinamento. Importe produtos via planilha ou adicione manualmente.",
    linkText: "Começar agora →",
  },
];

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <SectionBadge>Recursos</SectionBadge>
        </div>
        <h2 className={styles.sectionTitle}>
          Tudo que você precisa para
          <br />
          gerenciar seu estoque
        </h2>
        <p className={styles.sectionSubtitle}>
          Ferramentas poderosas e intuitivas que simplificam sua gestão. Do
          controle básico aos insights avançados.
        </p>
      </div>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
            <a href="#" className={styles.featureLink}>
              {feature.linkText}
            </a>
          </div>
        ))}
      </div>
      <div className={styles.featuresCta}>
        <h3 className={styles.ctaTitle}>Pronto para começar?</h3>

        <p className={styles.ctaText}>
          Crie sua conta grátis e organize seu estoque hoje mesmo.
          <br />
          Sem cartão de crédito. Sem complicação.
        </p>

        <ButtonLink link="#" variant="primary">
          Começar grátis
          <span className={styles.arrow}>→</span>
        </ButtonLink>

        {/*<a href="#" className={`${styles.btn} ${styles.btnPrimary}`}>
          Começar grátis
          <span className={styles.arrow}>→</span>
        </a>*/}
      </div>
    </section>
  );
}

import AnnoucementBadge from "../../../ui/annoucementBadge";
import ButtonLink from "../../../ui/buttonLink";
import styles from "./styles.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}></div>
      <div className={styles.heroContent}>
        <AnnoucementBadge />
        <h1 className={styles.heroTitle}>
          Gestão de estoque
          <br />
          <span className={styles.accent}>simples e inteligente.</span>
        </h1>

        <p className={styles.heroSub}>
          Controle seus produtos, monitore o estoque e tome decisões mais
          rápidas. Tudo em uma plataforma feita para crescer com o seu negócio.
        </p>

        <div className={styles.heroCta}>
          <ButtonLink link="#" size="lg" variant="primary">
            Começar grátis
          </ButtonLink>
          <ButtonLink link="#" size="lg" variant="outline">
            ▶&nbsp; Ver demo
          </ButtonLink>
        </div>

        <div className={styles.heroTrust}>
          <div className={styles.trustItem}>
            <span className={styles.trustCheck}>✓</span> Sem cartão de crédito
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustItem}>
            <span className={styles.trustCheck}>✓</span> Plano FREE incluso
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustItem}>
            <span className={styles.trustCheck}>✓</span> Setup em 2 minutos
          </div>
        </div>
      </div>
    </section>
  );
}

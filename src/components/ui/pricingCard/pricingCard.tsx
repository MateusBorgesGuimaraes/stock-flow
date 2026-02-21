import type { PricingPlan } from "../../../utils/types";
import styles from "./styles.module.css";

type PricingCardProps = {
  plan: PricingPlan;
};

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`${styles.pricingCard} ${
        plan.featured ? styles.featured : ""
      }`}
    >
      {plan.featured && <div className={styles.pricingBadge}>Mais popular</div>}

      <div className={styles.pricingHeader}>
        <div className={styles.pricingName}>{plan.name}</div>

        <div className={styles.pricingPrice}>
          {plan.price.currency && (
            <span className={styles.pricingCurrency}>
              {plan.price.currency}
            </span>
          )}

          <span className={styles.pricingAmount}>{plan.price.amount}</span>

          {plan.price.period && (
            <span className={styles.pricingPeriod}>{plan.price.period}</span>
          )}
        </div>

        <div
          className={styles.pricingLimit}
          dangerouslySetInnerHTML={{ __html: plan.limit }}
        />
      </div>

      <ul className={styles.pricingFeatures}>
        {plan.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <a
        href="#"
        className={`${styles.pricingCta} ${
          plan.variant === "primary"
            ? styles.pricingCtaPrimary
            : styles.pricingCtaSecondary
        }`}
      >
        {plan.cta}
      </a>

      <div className={styles.pricingNote}>{plan.note}</div>
    </div>
  );
}

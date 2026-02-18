import styles from "./styles.module.css";

export default function AnnoucementBadge() {
  return (
    <div className={styles.heroBadge}>
      <span className={styles.heroBadgeDot}></span>
      Novo: Dashboard com IA em tempo real
      <span>→</span>
    </div>
  );
}

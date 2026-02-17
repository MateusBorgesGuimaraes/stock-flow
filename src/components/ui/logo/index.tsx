import styles from "./styles.module.css";

export default function Logo() {
  return (
    <a href="#" className={styles.logo}>
      <div className={styles.logoIcon}>SF</div>
      <span className={styles.logoName}>StockFlow</span>
    </a>
  );
}

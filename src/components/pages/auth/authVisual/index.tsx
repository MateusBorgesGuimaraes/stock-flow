import styles from "./styles.module.css";

interface Stat {
  value: string;
  label: string;
}

interface AuthVisualProps {
  icon: string;
  title: string;
  text: string;
  stats: Stat[];
}

export function AuthVisual({ icon, title, text, stats }: AuthVisualProps) {
  return (
    <div className={styles.content}>
      <div className={styles.icon}>{icon}</div>

      <h2 className={styles.title}>{title}</h2>

      <p className={styles.text}>{text}</p>

      <div className={styles.stats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

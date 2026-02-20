import styles from "./styles.module.css";

type SectionBadgeProps = {
  children: React.ReactNode;
};

export default function SectionBadge({ children }: SectionBadgeProps) {
  return (
    <div className={styles.heroBadge}>
      <span className={styles.heroBadgeDot}></span>
      {children}
    </div>
  );
}

import styles from "./styles.module.css";

interface Props {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function FormButton({ isLoading, children }: Props) {
  return (
    <button type="submit" className={styles.submitButton} disabled={isLoading}>
      {isLoading ? "Entrando..." : children}
      {!isLoading && <span>→</span>}
    </button>
  );
}

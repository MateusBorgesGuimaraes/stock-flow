import styles from "./styles.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  size?: "sm" | "md";
}

export function MinFormButton({
  children,
  variant = "primary",
  type = "button",
  onClick,
  isLoading,
  disabled,
  size = "md",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}

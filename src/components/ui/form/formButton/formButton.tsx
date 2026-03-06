import styles from "./styles.module.css";

interface Props {
  isLoading?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export function FormButton({
  isLoading,
  children,
  variant = "primary",
  type = "submit",
  onClick,
  disabled,
}: Props) {
  const className =
    variant === "secondary" ? styles.cancelButton : styles.submitButton;

  return (
    <button
      type={type}
      className={className}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading ? "Carregando..." : children}
      {!isLoading && variant === "primary" && <span>→</span>}
    </button>
  );
}

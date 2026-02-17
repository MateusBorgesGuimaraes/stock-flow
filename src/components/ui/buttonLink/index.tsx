import styles from "./styles.module.css";

type ButtonProps = {
  children: React.ReactNode;
  link: string;
  variant?: "primary" | "ghost";
};

export default function ButtonLink({
  children,
  link,
  variant = "primary",
}: ButtonProps) {
  const variantClass = {
    primary: styles.btnPrimary,
    ghost: styles.btnGhost,
  };
  return (
    <a href={link} className={`${styles.btn} ${variantClass[variant]}`}>
      {children}
    </a>
  );
}

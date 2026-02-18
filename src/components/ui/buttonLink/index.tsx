import styles from "./styles.module.css";

type ButtonProps = {
  children: React.ReactNode;
  link: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
};

export default function ButtonLink({
  children,
  link,
  variant = "primary",
  size = "md",
}: ButtonProps) {
  const variantClass = {
    primary: styles.btnPrimary,
    ghost: styles.btnGhost,
    outline: styles.btnOutline,
  };

  const sizeClass = {
    md: styles.btnMd,
    lg: styles.btnLg,
  };

  return (
    <a
      href={link}
      className={`${styles.btn} ${variantClass[variant]} ${sizeClass[size]}`}
    >
      {children}
    </a>
  );
}

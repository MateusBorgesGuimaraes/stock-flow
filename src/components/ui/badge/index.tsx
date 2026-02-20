import styles from "./styles.module.css";

type BadgeProps = {
  text: string;
  variant: "success" | "warning" | "danger";
};

export default function Badge({ text, variant }: BadgeProps) {
  const variantStyles = {
    success: styles.badgeSuccess,
    warning: styles.badgeWarning,
    danger: styles.badgeDanger,
  };

  let icon = "✓";
  switch (variant) {
    case "warning":
      icon = "⚠";
      break;
    case "danger":
      icon = "✕";
      break;
    default:
      icon = "✓";
  }

  return (
    <span className={`${styles.badge} ${variantStyles[variant]}`}>
      {icon} {text}
    </span>
  );
}

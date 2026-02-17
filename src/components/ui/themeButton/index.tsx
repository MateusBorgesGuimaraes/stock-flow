import { useTheme } from "../../../hooks/useTheme";
import styles from "./styles.module.css";

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={() => toggleTheme()}
      className={styles.themeBtn}
      title="Alternar tema"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

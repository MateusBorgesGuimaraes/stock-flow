import styles from "./styles.module.css";
import Logo from "../../ui/logo";
import ThemeButton from "../../ui/themeButton";

interface AuthLayoutProps {
  children: React.ReactNode;
  visualContent: React.ReactNode;
}

export function AuthLayout({ children, visualContent }: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.formSide}>
        <div className={styles.header}>
          <Logo />
          <ThemeButton />
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formWrapper}>{children}</div>
        </div>
      </div>

      <div className={styles.visualSide}>{visualContent}</div>
    </div>
  );
}

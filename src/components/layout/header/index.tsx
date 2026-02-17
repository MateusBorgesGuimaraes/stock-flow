import ButtonLink from "../../ui/buttonLink";
import Logo from "../../ui/logo";
import ThemeButton from "../../ui/themeButton";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul className={styles.navLinks}>
        <li>
          <a href="#">Produto</a>
        </li>
        <li>
          <a href="#">Preços</a>
        </li>
        <li>
          <a href="#">Docs</a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
      </ul>

      <div className={styles.navActions}>
        <ThemeButton />
        <ButtonLink link="#" variant="ghost">
          Entrar
        </ButtonLink>
        <ButtonLink link="#">Começar grátis</ButtonLink>
      </div>
    </nav>
  );
}

import Logo from "../../ui/logo";
import styles from "./styles.module.css";

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const productLinks: FooterLink[] = [
  { label: "Recursos", href: "#" },
  { label: "Preços", href: "#" },
  { label: "Casos de uso", href: "#" },
  { label: "Atualizações", href: "#" },
  { label: "Roadmap", href: "#" },
];

const companyLinks: FooterLink[] = [
  { label: "Sobre nós", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Carreiras", href: "#" },
  { label: "Imprensa", href: "#" },
  { label: "Contato", href: "#" },
];

const supportLinks: FooterLink[] = [
  { label: "Documentação", href: "#" },
  { label: "Guias", href: "#" },
  { label: "API", href: "#" },
  { label: "Status", href: "#" },
  { label: "Central de ajuda", href: "#" },
];

const footerSections: FooterSection[] = [
  { title: "Produto", links: productLinks },
  { title: "Empresa", links: companyLinks },
  { title: "Suporte", links: supportLinks },
];

const socialLinks: FooterLink[] = [
  { label: "📷", href: "#" },
  { label: "🐦", href: "#" },
  { label: "💼", href: "#" },
  { label: "▶️", href: "#" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerBrand}>
          <Logo />

          <p className={styles.footerTagline}>
            Gestão de estoque simples e inteligente. Controle seus produtos e
            tome decisões melhores.
          </p>

          <div className={styles.footerSocial}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={styles.socialLink}
                aria-label="social"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {footerSections.map((section) => (
          <div key={section.title} className={styles.footerColumn}>
            <h4>{section.title}</h4>

            <ul className={styles.footerLinks}>
              {section.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.footerCopyright}>
          © 2025 <a href="#">StockFlow</a>. Todos os direitos reservados.
        </p>

        <ul className={styles.footerLegal}>
          <li>
            <a href="#">Privacidade</a>
          </li>
          <li>
            <a href="#">Termos de uso</a>
          </li>
          <li>
            <a href="#">Cookies</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

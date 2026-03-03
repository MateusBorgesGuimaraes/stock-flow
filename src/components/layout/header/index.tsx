import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Package,
  CreditCard,
  Building2,
  User,
} from "lucide-react";
import ButtonLink from "../../ui/buttonLink";
import Logo from "../../ui/logo";
import ThemeButton from "../../ui/themeButton";

import styles from "./styles.module.css";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthStore } from "../../../stores/useAuthStore";

export default function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout } = useLogout();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const publicLinks = [
    { label: "Produto", href: "#" },
    { label: "Preços", href: "#" },
    { label: "Docs", href: "#" },
    { label: "Blog", href: "#" },
  ];

  const privateLinks = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    { icon: <Package size={18} />, label: "Produtos", to: "/produtos" },
    { icon: <CreditCard size={18} />, label: "Planos", to: "/planos" },
    { icon: <Building2 size={18} />, label: "Empresa", to: "/empresa" },
  ];

  return (
    <nav className={styles.nav}>
      <Logo />

      {isAuthenticated ? (
        <div className={styles.privateNav}>
          {privateLinks.map((link) => (
            <Link key={link.to} to={link.to} className={styles.privateNavLink}>
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      ) : (
        <ul className={styles.navLinks}>
          {publicLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.navActions}>
        <ThemeButton />

        {isAuthenticated ? (
          <>
            <div className={styles.userMenuWrapper} ref={userMenuRef}>
              <button
                className={styles.userButton}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className={styles.userAvatar}>
                  <User size={18} />
                </div>
                <ChevronDown
                  size={16}
                  className={`${styles.chevron} ${showUserMenu ? styles.chevronOpen : ""}`}
                />
              </button>

              {showUserMenu && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownUser}>
                    <div className={styles.dropdownAvatar}>
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.dropdownUserInfo}>
                      <span className={styles.dropdownUserName}>
                        {user?.name}
                      </span>
                      <span className={styles.dropdownUserEmail}>
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  <div className={styles.dropdownDivider} />

                  <button
                    className={styles.dropdownItem}
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sair da conta</span>
                  </button>
                </div>
              )}
            </div>

            <button
              className={styles.mobileToggle}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle menu"
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </>
        ) : (
          <>
            <ButtonLink link="/login" variant="ghost">
              Entrar
            </ButtonLink>
            <ButtonLink link="/register">Começar grátis</ButtonLink>
          </>
        )}
      </div>

      {isAuthenticated && showMobileMenu && (
        <>
          <div
            className={styles.mobileOverlay}
            onClick={() => setShowMobileMenu(false)}
          />
          <div className={styles.mobileSidebar}>
            <div className={styles.mobileUser}>
              <div className={styles.mobileAvatar}>
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.mobileUserInfo}>
                <div className={styles.mobileUserName}>{user?.name}</div>
                <div className={styles.mobileUserEmail}>{user?.email}</div>
              </div>
            </div>

            <div className={styles.mobileLinks}>
              {privateLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={styles.mobileLink}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <div className={styles.mobileFooter}>
              <button
                className={styles.mobileLogout}
                onClick={() => {
                  setShowMobileMenu(false);
                  logout();
                }}
              >
                <LogOut size={18} />
                <span>Sair da conta</span>
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

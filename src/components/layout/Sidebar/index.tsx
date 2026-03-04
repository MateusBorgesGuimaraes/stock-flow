import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  Building2,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { useState } from "react";
import styles from "./styles.module.css";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useLogout } from "../../../hooks/useLogout";
import Logo from "../../ui/logo";

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { to: "/produtos", icon: <Package size={20} />, label: "Produtos" },
  { to: "/planos", icon: <CreditCard size={20} />, label: "Planos" },
  { to: "/empresa", icon: <Building2 size={20} />, label: "Empresa" },
];

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const { mutate: logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouterState();

  const isActive = (path: string) => router.location.pathname === path;

  return (
    <>
      <button
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : ""} ${collapsed ? styles.collapsed : ""}`}
      >
        <div className={styles.logo}>
          {!collapsed && <Logo />}
          <button
            className={styles.collapseBtn}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expandir sidebar" : "Minimizar sidebar"}
            title={collapsed ? "Expandir" : "Minimizar"}
          >
            {collapsed ? (
              <ChevronsRight size={18} />
            ) : (
              <ChevronsLeft size={18} />
            )}
          </button>
        </div>

        <div className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`${styles.navItem} ${isActive(item.to) ? styles.active : ""}`}
              onClick={() => setIsOpen(false)}
              title={collapsed ? item.label : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        <div className={styles.userSection}>
          <button
            className={styles.userButton}
            onClick={() => setShowUserMenu(!showUserMenu)}
            title={collapsed ? user?.name : undefined}
          >
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {user?.name.charAt(0).toUpperCase()}
              </div>
              {!collapsed && (
                <div className={styles.userDetails}>
                  <span className={styles.userName}>{user?.name}</span>
                  <span className={styles.userEmail}>{user?.email}</span>
                </div>
              )}
            </div>
            {!collapsed && (
              <ChevronDown
                size={16}
                className={`${styles.chevron} ${showUserMenu ? styles.chevronOpen : ""}`}
              />
            )}
          </button>

          {showUserMenu && (
            <div className={styles.userMenu}>
              <button className={styles.menuItem} onClick={() => logout()}>
                <LogOut size={16} />
                {!collapsed && <span>Sair</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

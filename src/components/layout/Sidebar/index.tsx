import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, CreditCard, Building2 } from "lucide-react";

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
  {
    to: "/dashboard",
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
  },
  {
    to: "/produtos",
    icon: <Package size={20} />,
    label: "Produtos",
  },
  {
    to: "/planos",
    icon: <CreditCard size={20} />,
    label: "Planos",
  },
  {
    to: "/empresa",
    icon: <Building2 size={20} />,
    label: "Empresa",
  },
];

export function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const { mutate: logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouterState();

  // Verifica se a rota está ativa
  const isActive = (path: string) => {
    return router.location.pathname === path;
  };

  return <>fazer dps</>;
}

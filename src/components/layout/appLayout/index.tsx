import { Outlet } from "@tanstack/react-router";

import styles from "./styles.module.css";
import { Sidebar } from "../Sidebar";

export function AppLayout() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

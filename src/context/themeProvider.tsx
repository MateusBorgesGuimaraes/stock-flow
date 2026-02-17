import { useEffect, useState } from "react";
import { ThemeContext, type Theme } from "./themeContext";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";

    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) return stored;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

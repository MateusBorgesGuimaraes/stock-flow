import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/useAuthStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (hasHydrated) {
      setShow(true);
    }
  }, [hasHydrated]);

  if (!show) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "var(--color-bg)",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid var(--color-border)",
            borderTopColor: "var(--color-primary)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}

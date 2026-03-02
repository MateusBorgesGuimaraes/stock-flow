import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  companyId: string | null;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateCompanyId: (companyId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      clearUser: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },

      updateCompanyId: (companyId) =>
        set((state) => ({
          user: state.user ? { ...state.user, companyId } : null,
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

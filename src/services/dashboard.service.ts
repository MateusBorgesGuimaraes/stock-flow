import { api } from "./api";

export interface DashboardSummary {
  company: {
    id: string;
    name: string;
    plan: string;
    planExpiresAt: string | null;
  };
  products: {
    total: number;
    lowStock: number;
    outOfStock: number;
    inStock: number;
    totalValue: number;
  };
  planUsage: {
    current: number;
    limit: number | null;
    limitText: string;
    usagePercent: number | null;
    isNearLimit: boolean;
  };
}

export interface StockAlert {
  id: string;
  name: string;
  quantity: number;
  lowStockThreshold: number;
  category: string | null;
  alertLevel: "OUT_OF_STOCK" | "LOW_STOCK";
}

export interface CategoryStat {
  category: string;
  productCount: number;
  totalQuantity: number;
  totalValue: number;
  totalValueFormatted: string;
}

export interface RecentProduct {
  name: string;
  quantity: number;
  category: string | null;
  updatedAt: string;
  price: number;
}

export interface DashboardMovements {
  recentlyUpdated: RecentProduct[];
  byCategory: CategoryStat[];
  period: string;
}

export async function fetchSummary(): Promise<DashboardSummary> {
  const { data } = await api.get("/dashboard");
  return data;
}

export async function fetchStockAlerts(): Promise<StockAlert[]> {
  const { data } = await api.get("/dashboard/stock-alerts");
  return data;
}

export async function fetchMovements(days = 30): Promise<DashboardMovements> {
  const { data } = await api.get(`/dashboard/movements?days=${days}`);
  return data;
}

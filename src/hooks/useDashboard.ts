import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  fetchSummary,
  fetchStockAlerts,
  fetchMovements,
} from "../services/dashboard.service";

export function useDashboard() {
  const [days, setDays] = useState(30);

  const summary = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: fetchSummary,
  });

  const stockAlerts = useQuery({
    queryKey: ["dashboard-stock-alerts"],
    queryFn: fetchStockAlerts,
  });

  const movements = useQuery({
    queryKey: ["dashboard-movements", days],
    queryFn: () => fetchMovements(days),
  });

  return {
    summary,
    stockAlerts,
    movements,
    days,
    setDays,
  };
}

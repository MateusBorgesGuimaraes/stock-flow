import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { CategoryStat } from "../../../../services/dashboard.service";
import styles from "./styles.module.css";

interface CategoryChartProps {
  data: CategoryStat[];
  metric: "totalValue" | "totalQuantity";
}

const COLORS = [
  "var(--color-primary)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-danger)",
  "#8b5cf6",
  "#06b6d4",
  "#f59e0b",
  "#10b981",
];

const formatPriceUnic = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

function CustomTooltip({
  active,
  payload,
  metric,
}: {
  active?: boolean;
  payload?: any[];
  metric: "totalValue" | "totalQuantity";
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as CategoryStat;

  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipLabel}>{d.category}</span>
      <span className={styles.tooltipValue}>
        {metric === "totalValue"
          ? new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(d.totalValue)
          : `${d.totalQuantity} unidades`}
      </span>
      <span className={styles.tooltipSub}>
        {d.productCount} produto{d.productCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

export function CategoryChart({ data, metric }: CategoryChartProps) {
  if (!data.length) return null;

  const sorted = [...data].sort((a, b) => b[metric] - a[metric]);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
        barSize={20}
      >
        <CartesianGrid
          horizontal={false}
          strokeDasharray="3 3"
          stroke="var(--color-border)"
        />
        <XAxis
          type="number"
          tickFormatter={
            metric === "totalValue" ? formatPriceUnic : (v) => String(v)
          }
          tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="category"
          width={90}
          tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={<CustomTooltip metric={metric} />}
          cursor={{ fill: "var(--color-surface-raised)" }}
        />
        <Bar dataKey={metric} radius={[0, 6, 6, 0]}>
          {sorted.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

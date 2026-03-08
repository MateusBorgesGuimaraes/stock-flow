import { Link } from "@tanstack/react-router";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  BarChart2,
  ArrowRight,
} from "lucide-react";

import styles from "./styles.module.css";
import { useDashboard } from "../../../../hooks/useDashboard";
import type {
  StockAlert,
  RecentProduct,
} from "../../../../services/dashboard.service";
import { formatDate } from "../../../../utils/formatDate";
import { useState } from "react";
import { CategoryChart } from "./categoryChart";

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={styles.sectionHeader}>
      <div>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function AlertRow({ alert }: { alert: StockAlert }) {
  const isOut = alert.alertLevel === "OUT_OF_STOCK";
  return (
    <div className={styles.alertRow}>
      <div className={styles.alertInfo}>
        <div
          className={`${styles.alertDot} ${isOut ? styles.alertDotOut : styles.alertDotLow}`}
        />
        <div>
          <span className={styles.alertName}>{alert.name}</span>
          {alert.category && (
            <span className={styles.alertCategory}>{alert.category}</span>
          )}
        </div>
      </div>
      <div className={styles.alertRight}>
        <span
          className={`${styles.badge} ${isOut ? styles.badgeout : styles.badgelow}`}
        >
          {isOut ? "Sem estoque" : "Estoque baixo"}
        </span>
        <span className={styles.alertQty}>
          {alert.quantity} / {alert.lowStockThreshold}
        </span>
      </div>
    </div>
  );
}

function RecentRow({ product }: { product: RecentProduct }) {
  return (
    <div className={styles.recentRow}>
      <div className={styles.recentInfo}>
        <div className={styles.recentIcon}>
          <Package size={16} />
        </div>
        <div>
          <span className={styles.recentName}>{product.name}</span>
          {product.category && (
            <span className={styles.recentCategory}>{product.category}</span>
          )}
        </div>
      </div>
      <div className={styles.recentRight}>
        <span className={styles.recentQty}>{product.quantity} un.</span>
        <span className={styles.recentDate}>
          {formatDate(product.updatedAt)}
        </span>
      </div>
    </div>
  );
}

function PlanUsageBar({
  current,
  limitText,
  usagePercent,
  isNearLimit,
}: {
  current: number;
  limitText: string;
  usagePercent: number | null;
  isNearLimit: boolean;
}) {
  if (usagePercent === null) {
    return (
      <div className={styles.planCard}>
        <div className={styles.planInfo}>
          <span className={styles.planLabel}>Uso do plano</span>
          <span className={styles.planValue}>
            {current} produtos · <strong>Ilimitado</strong>
          </span>
        </div>
        <div className={styles.planBarWrapper}>
          <div className={styles.planBarFull} />
        </div>
      </div>
    );
  }

  const isAtLimit = usagePercent >= 100;

  return (
    <div
      className={`${styles.planCard} ${isAtLimit ? styles.planCardDanger : isNearLimit ? styles.planCardWarning : ""}`}
    >
      <div className={styles.planInfo}>
        <span className={styles.planLabel}>
          {isAtLimit
            ? "🚫 Limite atingido"
            : isNearLimit
              ? "⚠ Limite se aproximando"
              : "Uso do plano"}
        </span>
        <span className={styles.planValue}>
          {current} / {limitText} produtos ({usagePercent}%)
        </span>
      </div>
      <div className={styles.planBarWrapper}>
        <div
          className={`${styles.planBar} ${isAtLimit ? styles.planBarDanger : isNearLimit ? styles.planBarWarning : ""}`}
          style={{ width: `${Math.min(usagePercent, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function Dashboard() {
  const { summary, stockAlerts, movements, days, setDays } = useDashboard();
  const [chartMetric, setChartMetric] = useState<
    "totalValue" | "totalQuantity"
  >("totalValue");

  const s = summary.data;
  const alerts = stockAlerts.data ?? [];
  const mov = movements.data;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {s ? `Olá, ${s.company.name} 👋` : "Dashboard"}
          </h1>
          <p className={styles.subtitle}>
            Visão geral do seu estoque e negócio
          </p>
        </div>
        <Link to="/produtos/novo" className={styles.addButton}>
          <Package size={18} />
          Novo Produto
        </Link>
      </div>

      {s && (
        <PlanUsageBar
          current={s.planUsage.current}
          limitText={s.planUsage.limitText}
          usagePercent={s.planUsage.usagePercent}
          isNearLimit={s.planUsage.isNearLimit}
        />
      )}

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "var(--color-primary-subtle)" }}
          >
            <Package size={20} style={{ color: "var(--color-primary)" }} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Total de Produtos</span>
            <span className={styles.statValue}>{s?.products.total ?? "—"}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "var(--color-success-subtle)" }}
          >
            <ShoppingCart size={20} style={{ color: "var(--color-success)" }} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Em Estoque</span>
            <span className={styles.statValue}>
              {s?.products.inStock ?? "—"}
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "var(--color-warning-subtle)" }}
          >
            <AlertTriangle
              size={20}
              style={{ color: "var(--color-warning)" }}
            />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Estoque Baixo</span>
            <span className={styles.statValue}>
              {s?.products.lowStock ?? "—"}
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "var(--color-danger-subtle)" }}
          >
            <TrendingUp size={20} style={{ color: "var(--color-danger)" }} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Sem Estoque</span>
            <span className={styles.statValue}>
              {s?.products.outOfStock ?? "—"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <SectionHeader
            title="Alertas de Estoque"
            subtitle={`${alerts.length} produto${alerts.length !== 1 ? "s" : ""} precisam de atenção`}
            action={
              <Link
                to="/produtos"
                search={{ lowStock: "true", page: "1" }}
                className={styles.seeAll}
              >
                Ver todos <ArrowRight size={14} />
              </Link>
            }
          />

          {stockAlerts.isLoading ? (
            <div className={styles.cardLoading}>
              <div className={styles.spinner} />
            </div>
          ) : alerts.length === 0 ? (
            <div className={styles.cardEmpty}>
              <TrendingUp size={32} />
              <p>Estoque saudável! Nenhum alerta.</p>
            </div>
          ) : (
            <div className={styles.list}>
              {alerts.map((a) => (
                <AlertRow key={a.id} alert={a} />
              ))}
            </div>
          )}
        </div>

        <div className={styles.card}>
          <SectionHeader
            title="Por Categoria"
            subtitle="Distribuição do estoque"
            action={
              <div className={styles.cardActions}>
                <div className={styles.daysToggle}>
                  <button
                    className={`${styles.dayButton} ${chartMetric === "totalValue" ? styles.dayActive : ""}`}
                    onClick={() => setChartMetric("totalValue")}
                  >
                    Valor
                  </button>
                  <button
                    className={`${styles.dayButton} ${chartMetric === "totalQuantity" ? styles.dayActive : ""}`}
                    onClick={() => setChartMetric("totalQuantity")}
                  >
                    Qtd
                  </button>
                </div>

                <div className={styles.daysToggle}>
                  {[7, 30, 90].map((d) => (
                    <button
                      key={d}
                      className={`${styles.dayButton} ${days === d ? styles.dayActive : ""}`}
                      onClick={() => setDays(d)}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
              </div>
            }
          />

          {movements.isLoading ? (
            <div className={styles.cardLoading}>
              <div className={styles.spinner} />
            </div>
          ) : !mov?.byCategory.length ? (
            <div className={styles.cardEmpty}>
              <BarChart2 size={32} />
              <p>Nenhum dado disponível.</p>
            </div>
          ) : (
            <CategoryChart data={mov.byCategory} metric={chartMetric} />
          )}
        </div>

        <div className={`${styles.card} ${styles.cardWide}`}>
          <SectionHeader
            title="Atualizados Recentemente"
            subtitle={mov ? `Últimos ${mov.period}` : ""}
            action={
              <Link
                to="/produtos"
                search={{ sortBy: "updatedAt", page: "1" }}
                className={styles.seeAll}
              >
                Ver todos <ArrowRight size={14} />
              </Link>
            }
          />

          {movements.isLoading ? (
            <div className={styles.cardLoading}>
              <div className={styles.spinner} />
            </div>
          ) : !mov?.recentlyUpdated.length ? (
            <div className={styles.cardEmpty}>
              <Package size={32} />
              <p>Nenhuma movimentação no período.</p>
            </div>
          ) : (
            <div className={styles.list}>
              {mov.recentlyUpdated.map((p, i) => (
                <RecentRow key={i} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

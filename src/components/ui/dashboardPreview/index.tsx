import Badge from "../badge";
import styles from "./styles.module.css";

export default function DashboardPreview() {
  return (
    <div className={styles.heroVisual}>
      <div className={`${styles.floatCard} ${styles.floatCardLeft}`}>
        <div className={styles.floatLabel}>Giro mensal</div>
        <div className={styles.floatValue}>R$ 84K</div>
        <div className={styles.floatChange}>↗ +23% vs mês anterior</div>
      </div>

      <div className={`${styles.floatCard} ${styles.floatCardRight}`}>
        <div className={styles.floatLabel}>Produtos monitorados</div>
        <div className={styles.floatValue}>1.240</div>
        <div className={styles.floatChange}>✓ Todos sincronizados</div>
      </div>

      <div className={styles.mockupFrame}>
        <div className={styles.mockupChrome}>
          <div className={styles.chromeDots}>
            <div className={styles.chromeDot}></div>
            <div className={styles.chromeDot}></div>
            <div className={styles.chromeDot}></div>
          </div>
          <div className={styles.chromeBar}>app.stockflow.com/dashboard</div>
        </div>

        <div className={styles.mockupBody}>
          <aside className={styles.mockSidebar}>
            <div className={styles.mockSidebarLogo}>
              <div className={styles.mockSidebarLogoIcon}>SF</div>
              <span className={styles.mockSidebarLogoText}>StockFlow</span>
            </div>

            <div className={`${styles.mockNavItem} ${styles.active}`}>
              <span className={styles.mockNavIcon}>📊</span> Dashboard
            </div>

            <div className={styles.mockNavItem}>
              <span className={styles.mockNavIcon}>📦</span> Produtos
              <span className={styles.mockNavBadge}>3</span>
            </div>

            <div className={styles.mockNavItem}>
              <span className={styles.mockNavIcon}>🔄</span> Movimentações
            </div>

            <div className={styles.mockNavItem}>
              <span className={styles.mockNavIcon}>📈</span> Relatórios
            </div>

            <div className={styles.mockNavItem}>
              <span className={styles.mockNavIcon}>⚙️</span> Configurações
            </div>
          </aside>

          <main className={styles.mockMain}>
            <div className={styles.mockTopBar}>
              <div className={styles.mockPageTitle}>Dashboard</div>

              <div className={styles.mockTopActions}>
                <button className={`${styles.mockBtn} ${styles.mockBtnGhost}`}>
                  ↓ Exportar
                </button>

                <button
                  className={`${styles.mockBtn} ${styles.mockBtnPrimary}`}
                >
                  + Novo produto
                </button>
              </div>
            </div>

            <div className={styles.mockStats}>
              <div className={styles.mockStat}>
                <div className={styles.mockStatTop}>
                  <div className={styles.mockStatLabel}>Total de produtos</div>
                  <div
                    className={styles.mockStatIcon}
                    style={{
                      background:
                        "color-mix(in srgb,var(--color-primary) 12%,var(--color-surface))",
                    }}
                  >
                    📦
                  </div>
                </div>
                <div className={styles.mockStatValue}>147</div>
                <div
                  className={styles.mockStatChange}
                  style={{ color: "var(--color-success)" }}
                >
                  ↗ +12% este mês
                </div>
              </div>

              <div className={styles.mockStat}>
                <div className={styles.mockStatTop}>
                  <div className={styles.mockStatLabel}>Estoque baixo</div>
                  <div
                    className={styles.mockStatIcon}
                    style={{
                      background:
                        "color-mix(in srgb,var(--color-warning) 12%,var(--color-surface))",
                    }}
                  >
                    ⚠️
                  </div>
                </div>
                <div className={styles.mockStatValue}>8</div>
                <div
                  className={styles.mockStatChange}
                  style={{ color: "var(--color-warning)" }}
                >
                  Atenção necessária
                </div>
              </div>

              <div className={styles.mockStat}>
                <div className={styles.mockStatTop}>
                  <div className={styles.mockStatLabel}>Valor total</div>
                  <div
                    className={styles.mockStatIcon}
                    style={{
                      background:
                        "color-mix(in srgb,var(--color-success) 12%,var(--color-surface))",
                    }}
                  >
                    💰
                  </div>
                </div>
                <div className={styles.mockStatValue}>45.2K</div>
                <div
                  className={styles.mockStatChange}
                  style={{ color: "var(--color-success)" }}
                >
                  ↗ +8% este mês
                </div>
              </div>
            </div>

            <div>
              <div className={styles.mockTableHeader}>
                <span className={styles.mockTableTitle}>Produtos recentes</span>
                <div className={styles.mockSearch}>🔍 Buscar produto...</div>
              </div>

              <table className={styles.mockTable}>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Qtd.</th>
                    <th>Status</th>
                    <th>Tendência</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className={styles.tdName}>Notebook Dell Inspiron</td>
                    <td>15</td>
                    <td>
                      <Badge text="Em estoque" variant="success" />
                    </td>

                    <td>
                      <div className={styles.chartBars}>
                        <div
                          className={styles.chartBar}
                          style={{ height: "40%" }}
                        />
                        <div
                          className={styles.chartBar}
                          style={{ height: "60%" }}
                        />
                        <div
                          className={styles.chartBar}
                          style={{ height: "45%" }}
                        />
                        <div
                          className={styles.chartBar}
                          style={{ height: "80%" }}
                        />
                        <div
                          className={`${styles.chartBar} ${styles.active}`}
                          style={{ height: "100%" }}
                        />
                      </div>
                    </td>

                    <td className={styles.tdActions}>
                      <div className={styles.tdBtn}>✏️</div>
                      <div className={styles.tdBtn}>🗑</div>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tdName}>Mouse Logitech MX</td>
                    <td>5</td>
                    <td>
                      <Badge text="Baixo" variant="warning" />
                    </td>
                    <td>
                      <div className={styles.chartBars}>
                        <div
                          className={styles.chartBar}
                          style={{ height: "40%" }}
                        />
                        <div
                          className={styles.chartBar}
                          style={{ height: "60%" }}
                        />
                        <div
                          className={styles.chartBar}
                          style={{ height: "45%" }}
                        />
                        <div
                          className={styles.chartBar}
                          style={{ height: "80%" }}
                        />
                        <div
                          className={`${styles.chartBar} ${styles.active}`}
                          style={{ height: "100%" }}
                        />
                      </div>
                    </td>

                    <td className={styles.tdActions}>
                      <div className={styles.tdBtn}>✏️</div>
                      <div className={styles.tdBtn}>🗑</div>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tdName}>Teclado Mecânico K3</td>
                    <td>0</td>
                    <td>
                      <Badge text="Esgotado" variant="danger" />
                    </td>

                    <td>
                      <div className={styles.chartBars}>
                        <div
                          className={styles.chartBar}
                          style={{ height: "40%" }}
                        />
                        <div
                          className={styles.chartBar}
                          style={{ height: "60%" }}
                        />
                        <div
                          className={styles.chartBar}
                          style={{ height: "45%" }}
                        />
                        <div
                          className={styles.chartBar}
                          style={{ height: "80%" }}
                        />
                        <div
                          className={`${styles.chartBar} ${styles.active}`}
                          style={{ height: "100%" }}
                        />
                      </div>
                    </td>

                    <td className={styles.tdActions}>
                      <div className={styles.tdBtn}>✏️</div>
                      <div className={styles.tdBtn}>🗑</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

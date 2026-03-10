import { useRef, useState, useEffect } from "react";
import { Download, FileText, Table } from "lucide-react";
import { useExportProducts } from "../../../../hooks/useExportProducts";
import type { FetchProductsParams } from "../../../../services/product.service";
import styles from "./styles.module.css";

interface ExportButtonProps {
  params: Omit<FetchProductsParams, "lowStock" | "page" | "limit"> & {
    lowStock?: string | boolean;
  };
}

export function ExportButton({ params }: ExportButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { exportProducts, isExporting } = useExportProducts();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handle = (format: "csv" | "xlsx") => {
    setOpen(false);
    exportProducts(format, params);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        disabled={isExporting}
        title="Exportar produtos"
      >
        <Download size={16} />
        {isExporting ? "Exportando..." : "Exportar"}
      </button>

      {open && (
        <div className={styles.dropdown}>
          <button className={styles.option} onClick={() => handle("csv")}>
            <FileText size={15} />
            <div>
              <span className={styles.optionLabel}>CSV</span>
              <span className={styles.optionHint}>
                Compatível com Excel e Google Sheets
              </span>
            </div>
          </button>
          <button className={styles.option} onClick={() => handle("xlsx")}>
            <Table size={15} />
            <div>
              <span className={styles.optionLabel}>Excel (XLSX)</span>
              <span className={styles.optionHint}>
                Formatado com larguras de coluna
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

import { AlertTriangle } from "lucide-react";
import styles from "./styles.module.css";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  cell?: (row: T) => React.ReactNode;
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  error?: unknown;
  empty?: React.ReactNode;
}

export function Table<T>({
  data,
  columns,
  keyExtractor,
  isLoading,
  error,
  empty,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.error}>
          <AlertTriangle size={48} />
          <p>Erro ao carregar dados</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.empty}>
          {empty ?? <p>Nenhum registro encontrado</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={{ width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={keyExtractor(row)}>
              {columns.map((col, i) => (
                <td key={i}>
                  {col.cell
                    ? col.cell(row)
                    : col.accessor
                      ? String(row[col.accessor] ?? "—")
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

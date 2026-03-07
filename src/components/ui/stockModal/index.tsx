import { useState } from "react";
import { X, Package } from "lucide-react";

import styles from "./styles.module.css";
import { useUpdateStock } from "../../../hooks/useUpdateStock";
import type { Product } from "../../../services/product.service";

interface StockModalProps {
  product: Product;
  onClose: () => void;
}

type Mode = "absolute" | "adjustment";

export function StockModal({ product, onClose }: StockModalProps) {
  const [mode, setMode] = useState<Mode>("adjustment");
  const [value, setValue] = useState<string>("");
  const { mutate: updateStock, isPending } = useUpdateStock(product.id);

  const handleSubmit = () => {
    const num = Math.trunc(Number(value));
    console.log({ mode, num, type: typeof num });
    if (isNaN(num) || value === "") return;

    if (mode === "absolute") {
      updateStock({ quantity: num }, { onSuccess: onClose });
    } else {
      updateStock({ adjustment: num }, { onSuccess: onClose });
    }
  };

  const previewQty =
    mode === "adjustment"
      ? product.quantity + (Number(value) || 0)
      : Number(value) || product.quantity;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.icon}>
              <Package size={20} />
            </div>
            <div>
              <h2 className={styles.title}>Atualizar Estoque</h2>
              <p className={styles.subtitle}>{product.name}</p>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.currentStock}>
          <span className={styles.currentLabel}>Estoque atual</span>
          <span className={styles.currentValue}>{product.quantity}</span>
        </div>

        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeButton} ${mode === "adjustment" ? styles.modeActive : ""}`}
            onClick={() => {
              setMode("adjustment");
              setValue("");
            }}
          >
            Ajuste relativo
          </button>
          <button
            className={`${styles.modeButton} ${mode === "absolute" ? styles.modeActive : ""}`}
            onClick={() => {
              setMode("absolute");
              setValue("");
            }}
          >
            Valor absoluto
          </button>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            {mode === "adjustment"
              ? "Ajuste (positivo para entrada, negativo para saída)"
              : "Novo valor do estoque"}
          </label>
          <input
            type="number"
            step="1"
            className={styles.input}
            placeholder={mode === "adjustment" ? "Ex: -5 ou +10" : "Ex: 50"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
        </div>

        {value !== "" && (
          <div
            className={`${styles.preview} ${previewQty < 0 ? styles.previewError : ""}`}
          >
            <span>Resultado</span>
            <strong>
              {previewQty < 0 ? "Estoque insuficiente" : previewQty}
            </strong>
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={isPending || value === "" || previewQty < 0}
          >
            {isPending ? "Salvando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}

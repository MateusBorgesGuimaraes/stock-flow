import { Link } from "@tanstack/react-router";
import { Edit2, Package, Trash2, BarChart2 } from "lucide-react";
import type { Product } from "../../../../services/product.service";
import styles from "./styles.module.css";
import type { Column } from "../../../ui/table";

const getStockStatus = (product: Product) => {
  if (product.quantity === 0) return "out";
  if (product.quantity <= product.lowStockThreshold) return "low";
  return "ok";
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    price,
  );

function ProductCell({ product }: { product: Product }) {
  return (
    <div className={styles.productInfo}>
      <div className={styles.productIcon}>
        <Package size={18} />
      </div>
      <div>
        <div className={styles.productName}>{product.name}</div>
        {product.description && (
          <div className={styles.productDesc}>{product.description}</div>
        )}
      </div>
    </div>
  );
}

function StockBadge({ product }: { product: Product }) {
  const status = getStockStatus(product);
  return (
    <span className={`${styles.badge} ${styles[`badge${status}`]}`}>
      {status === "out" && "Sem estoque"}
      {status === "low" && "Estoque baixo"}
      {status === "ok" && "Disponível"}
    </span>
  );
}

function ActionsCell({
  product,
  onDelete,
  onUpdateStock,
  isDeleting,
}: {
  product: Product;
  onDelete: (id: string) => void;
  onUpdateStock: (product: Product) => void;
  isDeleting: boolean;
}) {
  return (
    <div className={styles.actions}>
      <button
        className={styles.actionButton}
        onClick={() => onUpdateStock(product)}
        title="Atualizar estoque"
      >
        <BarChart2 size={16} />
      </button>
      <Link
        to="/produtos/$id"
        params={{ id: product.id }}
        className={styles.actionButton}
        title="Editar produto"
      >
        <Edit2 size={16} />
      </Link>
      <button
        className={styles.actionButton}
        onClick={() => onDelete(product.id)}
        disabled={isDeleting}
        title="Excluir produto"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export function buildProductColumns(
  onDelete: (id: string) => void,
  onUpdateStock: (product: Product) => void,
  deletingId: string | null,
): Column<Product>[] {
  return [
    {
      header: "Produto",
      cell: (p) => <ProductCell product={p} />,
    },
    {
      header: "Categoria",
      cell: (p) => <span className={styles.category}>{p.category || "—"}</span>,
    },
    {
      header: "SKU",
      cell: (p) => <code className={styles.sku}>{p.sku || "—"}</code>,
    },
    {
      header: "Preço",
      cell: (p) => <span className={styles.price}>{formatPrice(p.price)}</span>,
    },
    {
      header: "Estoque",
      cell: (p) => <span className={styles.quantity}>{p.quantity}</span>,
    },
    {
      header: "Status",
      cell: (p) => <StockBadge product={p} />,
    },
    {
      header: "",
      width: "130px",
      cell: (p) => (
        <ActionsCell
          product={p}
          onDelete={onDelete}
          onUpdateStock={onUpdateStock}
          isDeleting={deletingId === p.id}
        />
      ),
    },
  ];
}

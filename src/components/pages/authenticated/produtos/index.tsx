import { Link } from "@tanstack/react-router";
import {
  Plus,
  Search,
  Filter,
  Package,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

import styles from "./styles.module.css";
import { useProducts } from "../../../../hooks/useProducts";

import type { Product } from "../../../../services/product.service";
import { useDeleteProduct } from "../../../../hooks/useDeleteProduct";
import { useState } from "react";
import { toast } from "sonner";
import { Table } from "../../../ui/table";
import { buildProductColumns } from "./productColumns";
import { StockModal } from "../../../ui/stockModal";

const getStockStatus = (product: Product) => {
  if (product.quantity === 0) return "out";
  if (product.quantity <= product.lowStockThreshold) return "low";
  return "ok";
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    price,
  );

export function Produtos() {
  const {
    data,
    isLoading,
    error,
    page,
    search,
    category,
    lowStockOnly,
    sortBy,
    order,
    showFilters,
    setFilter,
    goToPage,
    setShowFilters,
  } = useProducts();

  const { mutate: deleteProduct } = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [stockProduct, setStockProduct] = useState<Product | null>(null);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    toast("Excluir este produto?", {
      description: "Esta ação não pode ser desfeita.",
      action: {
        label: "Excluir",
        onClick: () => {
          deleteProduct(id);
          setDeletingId(null);
        },
      },
      cancel: {
        label: "Cancelar",
        onClick: () => setDeletingId(null),
      },
    });
  };
  const columns = buildProductColumns(
    handleDelete,
    (product) => setStockProduct(product),
    deletingId,
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Produtos</h1>
          <p className={styles.subtitle}>
            Gerencie seu estoque e controle suas vendas
          </p>
        </div>
        <Link to="/produtos/novo" className={styles.addButton}>
          <Plus size={20} />
          Novo Produto
        </Link>
      </div>
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
            <span className={styles.statValue}>{data?.meta.total || 0}</span>
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
              {data?.data.filter((p) => getStockStatus(p) === "low").length ||
                0}
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "var(--color-success-subtle)" }}
          >
            <TrendingUp size={20} style={{ color: "var(--color-success)" }} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Valor Total</span>
            <span className={styles.statValue}>
              {formatPrice(
                data?.data.reduce((acc, p) => acc + p.price * p.quantity, 0) ||
                  0,
              )}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar produtos..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => setFilter({ search: e.target.value || undefined })}
          />
        </div>

        <button
          className={styles.filterButton}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filtros
        </button>
      </div>

      {showFilters && (
        <div className={styles.advancedFilters}>
          <div className={styles.filterGroup}>
            <label>Categoria</label>
            <select
              value={category}
              onChange={(e) =>
                setFilter({ category: e.target.value || undefined })
              }
              className={styles.select}
            >
              <option value="">Todas</option>
              <option value="Roupas">Roupas</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => setFilter({ sortBy: e.target.value })}
              className={styles.select}
            >
              <option value="createdAt">Mais recentes</option>
              <option value="name">Nome</option>
              <option value="price">Preço</option>
              <option value="quantity">Estoque</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Ordem</label>
            <select
              value={order}
              onChange={(e) => setFilter({ order: e.target.value })}
              className={styles.select}
            >
              <option value="DESC">Decrescente</option>
              <option value="ASC">Crescente</option>
            </select>
          </div>

          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              id="lowStock"
              checked={lowStockOnly}
              onChange={(e) =>
                setFilter({ lowStock: e.target.checked ? "true" : undefined })
              }
            />
            <label htmlFor="lowStock">Apenas estoque baixo</label>
          </div>
        </div>
      )}

      <Table
        data={data?.data ?? []}
        columns={columns}
        keyExtractor={(p) => p.id}
        isLoading={isLoading}
        error={error}
        empty={
          <div className={styles.empty}>
            <Package size={64} />
            <h3>Nenhum produto encontrado</h3>
            <p>Crie seu primeiro produto para começar</p>
            <Link to="/produtos/novo" className={styles.emptyButton}>
              <Plus size={20} /> Novo Produto
            </Link>
          </div>
        }
      />

      {data && data.meta.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            disabled={!data.meta.hasPrevPage}
            onClick={() => goToPage(page - 1)}
          >
            Anterior
          </button>

          <div className={styles.paginationInfo}>
            Página {data.meta.page} de {data.meta.totalPages}
          </div>

          <button
            className={styles.paginationButton}
            disabled={!data.meta.hasNextPage}
            onClick={() => goToPage(page + 1)}
          >
            Próxima
          </button>
        </div>
      )}
      {stockProduct && (
        <StockModal
          product={stockProduct}
          onClose={() => setStockProduct(null)}
        />
      )}
    </div>
  );
}

import * as XLSX from "xlsx";
import { fetchProducts } from "../services/product.service";
import type { FetchProductsParams, Product } from "../services/product.service";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "../utils/formatPrice";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR").format(new Date(date));

const STOCK_STATUS = (p: Product) => {
  if (p.quantity === 0) return "Esgotado";
  if (p.quantity <= p.lowStockThreshold) return "Estoque baixo";
  return "Normal";
};

function toRows(products: Product[]) {
  return products.map((p) => ({
    Nome: p.name,
    Categoria: p.category ?? "—",
    Preço: formatPrice(p.price),
    Quantidade: p.quantity,
    "Estoque mínimo": p.lowStockThreshold,
    Status: STOCK_STATUS(p),
    "Valor em estoque": formatPrice(p.price * p.quantity),
    "Atualizado em": formatDate(p.updatedAt),
  }));
}

async function fetchAllFiltered(
  params: Omit<FetchProductsParams, "lowStock" | "page" | "limit"> & {
    lowStock?: string | boolean | undefined;
  },
): Promise<Product[]> {
  const result = await fetchProducts({
    ...params,
    lowStock:
      params.lowStock === true || params.lowStock === "true" ? true : undefined,
    page: 1,
    limit: 9999,
  });
  return result.data;
}

export function exportToCSV(products: Product[], filename = "produtos") {
  const rows = toRows(products);
  const headers = Object.keys(rows[0]);
  const csvLines = [
    headers.join(";"),
    ...rows.map((row) =>
      headers
        .map(
          (h) => `"${String(row[h as keyof typeof row]).replace(/"/g, '""')}"`,
        )
        .join(";"),
    ),
  ];
  const blob = new Blob(["\uFEFF" + csvLines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  triggerDownload(blob, `${filename}.csv`);
}

export function exportToXLSX(products: Product[], filename = "produtos") {
  const rows = toRows(products);
  const ws = XLSX.utils.json_to_sheet(rows);

  ws["!cols"] = [
    { wch: 30 }, // Nome
    { wch: 18 }, // Categoria
    { wch: 14 }, // Preço
    { wch: 12 }, // Quantidade
    { wch: 16 }, // Estoque mínimo
    { wch: 14 }, // Status
    { wch: 18 }, // Valor em estoque
    { wch: 16 }, // Atualizado em
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Produtos");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function useExportProducts() {
  const [isExporting, setIsExporting] = useState(false);

  const exportProducts = async (
    format: "csv" | "xlsx",
    params: Omit<FetchProductsParams, "lowStock" | "page" | "limit"> & {
      lowStock?: string | boolean;
    },
  ) => {
    setIsExporting(true);
    try {
      const products = await fetchAllFiltered(params);

      if (!products.length) {
        toast.error("Nenhum produto encontrado para exportar.");
        return;
      }

      const date = new Intl.DateTimeFormat("pt-BR")
        .format(new Date())
        .replace(/\//g, "-");
      const filename = `produtos_${date}`;

      if (format === "csv") exportToCSV(products, filename);
      else exportToXLSX(products, filename);

      toast.success(`${products.length} produto(s) exportado(s) com sucesso.`);
    } catch {
      toast.error("Erro ao exportar produtos.");
    } finally {
      setIsExporting(false);
    }
  };

  return { exportProducts, isExporting };
}

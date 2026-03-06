import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/product.service";

export function useProducts() {
  const navigate = useNavigate();
  const searchParams = useSearch({
    from: "/_authenticated/_has-company/produtos/",
  });
  const [showFilters, setShowFilters] = useState(false);

  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";
  const category = searchParams.category || "";
  const lowStockOnly = searchParams.lowStock === "true";
  const sortBy = searchParams.sortBy || "createdAt";
  const order = (searchParams.order || "DESC") as "ASC" | "DESC";

  const setFilter = (filters: Record<string, string | undefined>) => {
    navigate({
      to: "/produtos",
      search: (prev) => ({ ...prev, ...filters, page: "1" }),
    });
  };

  const goToPage = (newPage: number) => {
    navigate({
      to: "/produtos",
      search: (prev) => ({ ...prev, page: String(newPage) }),
    });
  };

  const query = useQuery({
    queryKey: ["products", page, search, category, lowStockOnly, sortBy, order],
    queryFn: () =>
      fetchProducts({
        page,
        limit: 5,
        search,
        category,
        lowStock: lowStockOnly,
        sortBy,
        order,
      }),
  });

  return {
    ...query,

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
  };
}

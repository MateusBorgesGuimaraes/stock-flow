import type { ProductFormData } from "../schemas/product.schema";
import { api } from "./api";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  lowStockThreshold: number;
  category: string;
  sku: string;
  createdAt: string;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface FetchProductsParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  lowStock?: boolean;
  sortBy?: string;
  order?: string;
}

export async function createProduct(payload: ProductFormData) {
  const { data } = await api.post("/products", payload);
  return data;
}

export async function fetchProducts(
  params: FetchProductsParams,
): Promise<ProductsResponse> {
  const queryParams = new URLSearchParams();
  queryParams.append("page", params.page.toString());
  queryParams.append("limit", params.limit.toString());
  if (params.search) queryParams.append("search", params.search);
  if (params.category) queryParams.append("category", params.category);
  if (params.lowStock) queryParams.append("lowStock", "true");
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.order) queryParams.append("order", params.order);

  const { data } = await api.get(`/products?${queryParams.toString()}`);
  return data;
}

export async function fetchProduct(id: string) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function deleteProduct(id: string) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

export async function updateProduct(id: string, payload: ProductFormData) {
  const { data } = await api.patch(`/products/${id}`, payload);
  return data;
}

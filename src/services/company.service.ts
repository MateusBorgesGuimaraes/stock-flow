import { api } from "./api";
import type { CompanyFormData } from "../schemas/company.schema";

export type UserRole = "OWNER" | "ADMIN" | "VIEWER";

export const ROLE_LABELS: Record<UserRole, string> = {
  OWNER: "Dono",
  ADMIN: "Administrador",
  VIEWER: "Visualizador",
};

export interface CompanyUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  plan: "FREE" | "DELUXE" | "PREMIUM";
  planExpiresAt: string | null;
  planLimit: number | null;
  planLimitText: string;
  createdAt: string;
  users: CompanyUser[];
}

export interface AddMemberPayload {
  email: string;
  role: Exclude<UserRole, "OWNER">;
}

export async function createCompany(payload: CompanyFormData) {
  const { data } = await api.post("/companies", payload);
  return data;
}

export async function fetchMyCompany(): Promise<Company> {
  const { data } = await api.get("/companies/me");
  return data;
}

export async function updateCompanyName(
  id: string,
  name: string,
): Promise<Company> {
  const { data } = await api.patch(`/companies/${id}`, { name });
  return data;
}

export async function addMember(
  payload: AddMemberPayload,
): Promise<{ message: string }> {
  const { data } = await api.post("/companies/members", payload);
  return data;
}

export async function removeMember(
  userId: string,
): Promise<{ message: string }> {
  const { data } = await api.delete(`/companies/members/${userId}`);
  return data;
}

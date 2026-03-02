import type { LoginFormData } from "../schemas/login.schema";
import type { RegisterFormData } from "../schemas/register.schema";
import { api } from "./api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId: string | null;
}

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export async function loginUser(
  payload: LoginFormData,
): Promise<LoginResponse> {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function registerUser(
  payload: RegisterFormData,
): Promise<RegisterResponse> {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function logoutUser(): Promise<void> {
  await api.post("/auth/logout");
}

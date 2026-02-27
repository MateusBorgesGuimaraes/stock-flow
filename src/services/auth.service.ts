import { api } from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  user: { id: string; name: string; email: string };
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponse {
  user: { id: string; name: string; email: string };
  accessToken: string;
  refreshToken: string;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

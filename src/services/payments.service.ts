import { api } from "./api";

export type PlanType = "FREE" | "DELUXE" | "PREMIUM";
export type PaymentMethod = "PIX" | "BOLETO" | "CREDIT_CARD";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  priceText: string;
  limit: number | null;
  features: string[];
}

export interface CheckoutResponse {
  message: string;
  paymentToken: string;
  amount: number;
  amountFormatted: string;
  plan: PlanType;
  method: PaymentMethod;
  expiresIn: string;
  instructions: PixInstructions | BoletoInstructions | CardInstructions;
}

export interface PixInstructions {
  type: "PIX";
  key: string;
  amount: number;
  note: string;
}

export interface BoletoInstructions {
  type: "BOLETO";
  barCode: string;
  dueDate: string;
  note: string;
}

export interface CardInstructions {
  type: "CREDIT_CARD";
  note: string;
}

export interface ConfirmResponse {
  message: string;
  transactionId: string;
  plan: PlanType;
  amount: number;
  amountFormatted: string;
  planExpiresAt: string;
}

export interface PaymentHistory {
  id: string;
  plan: PlanType;
  amount: number;
  amountFormatted: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId: string | null;
  createdAt: string;
  confirmedAt: string | null;
}

export async function fetchPlans(): Promise<Plan[]> {
  const { data } = await api.get("/payments/plans");
  return data;
}

export async function checkout(
  plan: PlanType,
  method: PaymentMethod,
): Promise<CheckoutResponse> {
  const { data } = await api.post("/payments/checkout", { plan, method });
  return data;
}

export async function confirmPayment(
  paymentToken: string,
): Promise<ConfirmResponse> {
  const { data } = await api.post("/payments/confirm", { paymentToken });
  return data;
}

export async function fetchPaymentHistory(): Promise<PaymentHistory[]> {
  const { data } = await api.get("/payments/history");
  return data;
}

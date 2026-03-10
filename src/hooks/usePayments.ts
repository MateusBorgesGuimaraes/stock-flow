import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import {
  fetchPlans,
  fetchPaymentHistory,
  checkout,
  confirmPayment,
  type PlanType,
  type PaymentMethod,
} from "../services/payments.service";

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });
}

export function usePaymentHistory() {
  return useQuery({
    queryKey: ["payment-history"],
    queryFn: fetchPaymentHistory,
  });
}

export function useCheckout() {
  return useMutation({
    mutationFn: ({ plan, method }: { plan: PlanType; method: PaymentMethod }) =>
      checkout(plan, method),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Erro ao iniciar checkout",
        );
      }
    },
  });
}

export function useConfirmPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentToken: string) => confirmPayment(paymentToken),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["company"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
      queryClient.invalidateQueries({ queryKey: ["payment-history"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Erro ao confirmar pagamento",
        );
      }
    },
  });
}

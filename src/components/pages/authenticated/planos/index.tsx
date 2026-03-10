import { useState } from "react";
import {
  Check,
  Crown,
  Zap,
  Package,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  Copy,
  ArrowRight,
  X,
} from "lucide-react";

import styles from "./styles.module.css";
import {
  usePlans,
  usePaymentHistory,
  useCheckout,
  useConfirmPayment,
} from "../../../../hooks/usePayments";
import { useCompany } from "../../../../hooks/useCompany";

import type {
  Plan,
  PlanType,
  PaymentMethod,
  CheckoutResponse,
  PixInstructions,
  BoletoInstructions,
} from "../../../../services/payments.service";
import { MinFormButton } from "../../../ui/form/minFormButton";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));

const PLAN_ICONS: Record<PlanType, React.ReactNode> = {
  FREE: <Package size={22} />,
  DELUXE: <Zap size={22} />,
  PREMIUM: <Crown size={22} />,
};

const METHOD_LABELS: Record<PaymentMethod, string> = {
  PIX: "PIX",
  BOLETO: "Boleto",
  CREDIT_CARD: "Cartão de crédito",
};

const STATUS_CONFIG = {
  COMPLETED: {
    label: "Aprovado",
    color: "var(--color-success)",
    icon: <CheckCircle2 size={14} />,
  },
  PENDING: {
    label: "Pendente",
    color: "var(--color-warning)",
    icon: <Clock size={14} />,
  },
  FAILED: {
    label: "Falhou",
    color: "var(--color-danger)",
    icon: <XCircle size={14} />,
  },
};

function PlanCard({
  plan,
  currentPlan,
  onSelect,
}: {
  plan: Plan;
  currentPlan: PlanType;
  onSelect: (plan: Plan) => void;
}) {
  const isCurrent = plan.id === currentPlan;
  const isDowngrade =
    (currentPlan === "PREMIUM" && plan.id !== "PREMIUM") ||
    (currentPlan === "DELUXE" && plan.id === "FREE");

  return (
    <div
      className={`${styles.planCard} ${isCurrent ? styles.planCardCurrent : ""} ${plan.id === "PREMIUM" ? styles.planCardPremium : ""}`}
    >
      {isCurrent && <div className={styles.currentBadge}>Plano atual</div>}
      {plan.id === "PREMIUM" && !isCurrent && (
        <div className={styles.popularBadge}>Mais popular</div>
      )}

      <div className={styles.planCardHeader}>
        <div className={`${styles.planIcon} ${styles[`planIcon${plan.id}`]}`}>
          {PLAN_ICONS[plan.id]}
        </div>
        <div>
          <h3 className={styles.planName}>{plan.name}</h3>
          <span className={styles.planPrice}>{plan.priceText}</span>
        </div>
      </div>

      <ul className={styles.featureList}>
        {plan.features.map((f) => (
          <li key={f} className={styles.featureItem}>
            <Check size={14} className={styles.featureCheck} />
            {f}
          </li>
        ))}
      </ul>

      <div className={styles.planCardFooter}>
        {isCurrent ? (
          <MinFormButton variant="secondary" disabled>
            Plano atual
          </MinFormButton>
        ) : plan.id === "FREE" ? (
          <MinFormButton variant="secondary" disabled>
            {isDowngrade ? "Cancelar plano" : "Gratuito"}
          </MinFormButton>
        ) : (
          <MinFormButton onClick={() => onSelect(plan)}>
            {isDowngrade ? "Fazer downgrade" : "Assinar"}{" "}
            <ArrowRight size={14} />
          </MinFormButton>
        )}
      </div>
    </div>
  );
}

function CheckoutModal({
  plan,
  onClose,
  onConfirmed,
}: {
  plan: Plan;
  onClose: () => void;
  onConfirmed: () => void;
}) {
  const [method, setMethod] = useState<PaymentMethod>("PIX");
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(
    null,
  );
  const [copied, setCopied] = useState(false);

  const { mutate: doCheckout, isPending: checkingOut } = useCheckout();
  const { mutate: doConfirm, isPending: confirming } = useConfirmPayment();

  const handleCheckout = () => {
    doCheckout(
      { plan: plan.id, method },
      { onSuccess: (data) => setCheckoutData(data) },
    );
  };

  const handleConfirm = () => {
    if (!checkoutData) return;
    doConfirm(checkoutData.paymentToken, {
      onSuccess: () => {
        onConfirmed();
        onClose();
      },
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pix = checkoutData?.instructions as PixInstructions | undefined;
  const boleto = checkoutData?.instructions as BoletoInstructions | undefined;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>Assinar plano {plan.name}</h2>
            <p className={styles.modalSubtitle}>{plan.priceText}</p>
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {!checkoutData ? (
          <>
            <div className={styles.methodSection}>
              <p className={styles.methodLabel}>Forma de pagamento</p>
              <div className={styles.methodGrid}>
                {(["PIX", "BOLETO", "CREDIT_CARD"] as PaymentMethod[]).map(
                  (m) => (
                    <button
                      key={m}
                      className={`${styles.methodBtn} ${method === m ? styles.methodBtnActive : ""}`}
                      onClick={() => setMethod(m)}
                    >
                      <CreditCard size={16} />
                      {METHOD_LABELS[m]}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <MinFormButton variant="secondary" onClick={onClose}>
                Cancelar
              </MinFormButton>
              <MinFormButton onClick={handleCheckout} isLoading={checkingOut}>
                Continuar
              </MinFormButton>
            </div>
          </>
        ) : (
          <>
            <div className={styles.instructionsSection}>
              {checkoutData.method === "PIX" && pix && (
                <div className={styles.instructionBlock}>
                  <p className={styles.instructionTitle}>Chave PIX</p>
                  <div className={styles.copyRow}>
                    <code className={styles.copyValue}>{pix.key}</code>
                    <button
                      className={styles.copyBtn}
                      onClick={() => handleCopy(pix.key)}
                    >
                      <Copy size={14} />
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                  <p className={styles.instructionNote}>{pix.note}</p>
                </div>
              )}

              {checkoutData.method === "BOLETO" && boleto && (
                <div className={styles.instructionBlock}>
                  <p className={styles.instructionTitle}>Código de barras</p>
                  <div className={styles.copyRow}>
                    <code className={styles.copyValue}>{boleto.barCode}</code>
                    <button
                      className={styles.copyBtn}
                      onClick={() => handleCopy(boleto.barCode)}
                    >
                      <Copy size={14} />
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                  <p className={styles.instructionNote}>
                    Vencimento: {boleto.dueDate} · {boleto.note}
                  </p>
                </div>
              )}

              {checkoutData.method === "CREDIT_CARD" && (
                <div className={styles.instructionBlock}>
                  <p className={styles.instructionTitle}>Cartão de crédito</p>
                  <p className={styles.instructionNote}>
                    Em produção, o SDK do gateway seria carregado aqui para
                    coletar os dados do cartão com segurança.
                  </p>
                </div>
              )}

              <div className={styles.tokenRow}>
                <span className={styles.tokenLabel}>Token da transação</span>
                <code className={styles.tokenValue}>
                  {checkoutData.paymentToken.slice(0, 24)}...
                </code>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <MinFormButton variant="secondary" onClick={onClose}>
                Fechar
              </MinFormButton>
              <MinFormButton onClick={handleConfirm} isLoading={confirming}>
                Confirmar pagamento
              </MinFormButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function HistoryRow({
  payment,
}: {
  payment: import("../../../../services/payments.service").PaymentHistory;
}) {
  const status = STATUS_CONFIG[payment.status];

  return (
    <div className={styles.historyRow}>
      <div className={styles.historyIcon}>{PLAN_ICONS[payment.plan]}</div>
      <div className={styles.historyInfo}>
        <span className={styles.historyPlan}>Plano {payment.plan}</span>
        <span className={styles.historyDate}>
          {formatDate(payment.createdAt)}
        </span>
      </div>
      <span className={styles.historyMethod}>
        {METHOD_LABELS[payment.method]}
      </span>
      <span className={styles.historyAmount}>{payment.amountFormatted}</span>
      <span className={styles.historyStatus} style={{ color: status.color }}>
        {status.icon}
        {status.label}
      </span>
    </div>
  );
}

export function Planos() {
  const { data: plans, isLoading: loadingPlans } = usePlans();
  const { data: company } = useCompany();
  const { data: history, isLoading: loadingHistory } = usePaymentHistory();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const currentPlan = (company?.plan ?? "FREE") as PlanType;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Planos e Assinatura</h1>
          <p className={styles.subtitle}>
            Gerencie seu plano e histórico de pagamentos
          </p>
        </div>
      </div>

      {company && (
        <div className={styles.currentPlanCard}>
          <div className={styles.currentPlanInfo}>
            <div
              className={`${styles.planIcon} ${styles[`planIcon${currentPlan}`]}`}
            >
              {PLAN_ICONS[currentPlan]}
            </div>
            <div>
              <p className={styles.currentPlanLabel}>Plano ativo</p>
              <p className={styles.currentPlanName}>
                {currentPlan === "FREE"
                  ? "Gratuito"
                  : currentPlan === "DELUXE"
                    ? "Deluxe"
                    : "Premium"}
              </p>
            </div>
          </div>
          {company.planExpiresAt && (
            <div className={styles.currentPlanExpiry}>
              <Clock size={14} />
              Renova em {formatDate(company.planExpiresAt)}
            </div>
          )}
        </div>
      )}

      <div className={styles.plansGrid}>
        {loadingPlans ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
          </div>
        ) : (
          plans?.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currentPlan={currentPlan}
              onSelect={setSelectedPlan}
            />
          ))
        )}
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <CreditCard size={20} className={styles.cardHeaderIcon} />
          <h2 className={styles.cardTitle}>Histórico de pagamentos</h2>
        </div>

        {loadingHistory ? (
          <div className={styles.cardLoading}>
            <div className={styles.spinner} />
          </div>
        ) : !history?.length ? (
          <div className={styles.cardEmpty}>
            <CreditCard size={32} />
            <p>Nenhum pagamento registrado.</p>
          </div>
        ) : (
          <div className={styles.historyList}>
            {history.map((p) => (
              <HistoryRow key={p.id} payment={p} />
            ))}
          </div>
        )}
      </div>

      {selectedPlan && (
        <CheckoutModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onConfirmed={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}

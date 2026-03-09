import { useState } from "react";
import {
  Building2,
  Users,
  Crown,
  Calendar,
  Package,
  Edit2,
  Check,
  X,
  UserPlus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import styles from "./styles.module.css";
import { useCompany } from "../../../../hooks/useCompany";
import {
  useUpdateCompany,
  useAddMember,
  useRemoveMember,
} from "../../../../hooks/useCompanyMutations";
import { useDashboard } from "../../../../hooks/useDashboard";
import {
  ROLE_LABELS,
  type CompanyUser,
  type UserRole,
} from "../../../../services/company.service";
import { useAuthStore } from "../../../../stores/useAuthStore";
import { FormInput } from "../../../ui/form/formInput";
import { FormSelect } from "../../../ui/form/formSelect";
import { MinFormButton } from "../../../ui/form/minFormButton";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  FREE: { label: "Gratuito", color: "var(--color-text-secondary)" },
  DELUXE: { label: "Deluxe", color: "var(--color-primary)" },
  PREMIUM: { label: "Premium", color: "var(--color-warning)" },
};

const ROLE_COLORS: Record<UserRole, string> = {
  OWNER: "var(--color-warning)",
  ADMIN: "var(--color-primary)",
  VIEWER: "var(--color-text-secondary)",
};

function CompanyNameEditor({
  id,
  currentName,
}: {
  id: string;
  currentName: string;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(currentName);
  const { mutate: update, isPending } = useUpdateCompany();

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === currentName) {
      setEditing(false);
      setValue(currentName);
      return;
    }
    update({ id, name: trimmed }, { onSuccess: () => setEditing(false) });
  };

  const handleCancel = () => {
    setValue(currentName);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className={styles.nameEditor}>
        <input
          className={styles.nameInput}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          autoFocus
          disabled={isPending}
        />
        <button
          className={styles.nameAction}
          onClick={handleSave}
          disabled={isPending}
        >
          <Check size={16} />
        </button>
        <button
          className={`${styles.nameAction} ${styles.nameActionCancel}`}
          onClick={handleCancel}
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.nameDisplay}>
      <h1 className={styles.companyName}>{currentName}</h1>
      <button className={styles.editButton} onClick={() => setEditing(true)}>
        <Edit2 size={16} />
      </button>
    </div>
  );
}

function AddMemberForm({ onClose }: { onClose: () => void }) {
  const { mutate: addMember, isPending } = useAddMember();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    role: "ADMIN" | "VIEWER";
  }>({ defaultValues: { role: "ADMIN" } });

  const onSubmit = handleSubmit((data) => {
    addMember(data, { onSuccess: () => onClose() });
  });

  return (
    <div className={styles.addMemberForm}>
      <div className={styles.addMemberHeader}>
        <span className={styles.addMemberTitle}>Adicionar membro</span>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <form onSubmit={onSubmit} className={styles.addMemberFields}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="email@exemplo.com"
          register={register}
          registerOptions={{
            required: "Email obrigatório",
            pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" },
          }}
          error={errors.email}
        />

        <FormSelect
          label="Permissão"
          name="role"
          register={register}
          options={[
            { value: "ADMIN", label: "Administrador — gerencia produtos" },
            { value: "VIEWER", label: "Visualizador — apenas leitura" },
          ]}
        />

        <div className={styles.addMemberActions}>
          <MinFormButton variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </MinFormButton>
          <MinFormButton type="submit" isLoading={isPending}>
            Adicionar
          </MinFormButton>
        </div>
      </form>
    </div>
  );
}

function MemberRow({
  user,
  isOwner,
  currentUserId,
}: {
  user: CompanyUser;
  isOwner: boolean;
  currentUserId: string;
}) {
  const { mutate: remove, isPending } = useRemoveMember();
  const isCurrentUser = user.id === currentUserId;
  const canRemove = isOwner && !isCurrentUser && user.role !== "OWNER";

  const handleRemove = () => {
    toast(`Remover ${user.name}?`, {
      description: "O usuário perderá acesso à empresa.",
      action: {
        label: "Remover",
        onClick: () => remove(user.id),
      },
      cancel: { label: "Cancelar", onClick: () => {} },
    });
  };

  return (
    <div className={styles.memberRow}>
      <div className={styles.memberAvatar}>
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className={styles.memberInfo}>
        <div className={styles.memberNameRow}>
          <span className={styles.memberName}>{user.name}</span>
          {isCurrentUser && <span className={styles.youBadge}>você</span>}
        </div>
        <span className={styles.memberEmail}>{user.email}</span>
      </div>

      <span
        className={styles.roleBadge}
        style={{
          color: ROLE_COLORS[user.role],
          borderColor: ROLE_COLORS[user.role],
        }}
      >
        {ROLE_LABELS[user.role]}
      </span>

      <span className={styles.memberSince}>
        Desde {formatDate(user.createdAt)}
      </span>

      {canRemove ? (
        <button
          className={styles.removeButton}
          onClick={handleRemove}
          disabled={isPending}
          title="Remover membro"
        >
          <Trash2 size={15} />
        </button>
      ) : (
        <div className={styles.removeButtonPlaceholder} />
      )}
    </div>
  );
}

export function Empresa() {
  const { data: company, isLoading } = useCompany();
  const { summary } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);

  const s = summary.data;
  const usagePercent = s?.planUsage.usagePercent ?? null;
  const isAtLimit = usagePercent !== null && usagePercent >= 100;
  const isNearLimit = s?.planUsage.isNearLimit ?? false;
  const planInfo = PLAN_LABELS[company?.plan ?? "FREE"];

  const authUser = useAuthStore((state) => state.user);
  const isOwner = authUser?.role === "OWNER";
  const currentUserId = authUser?.id ?? "";

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Carregando dados da empresa...</p>
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <Building2 size={28} />
        </div>
        <div className={styles.headerInfo}>
          <CompanyNameEditor id={company.id} currentName={company.name} />
          <div className={styles.headerMeta}>
            <span
              className={styles.planBadge}
              style={{ color: planInfo.color, borderColor: planInfo.color }}
            >
              <Crown size={12} />
              {planInfo.label}
            </span>
            <span className={styles.metaDot} />
            <span className={styles.metaText}>
              Criada em {formatDate(company.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Crown size={20} className={styles.cardHeaderIcon} />
            <h2 className={styles.cardTitle}>Plano Atual</h2>
          </div>

          <div className={styles.planDetails}>
            <div className={styles.planRow}>
              <span className={styles.planRowLabel}>Plano</span>
              <span
                className={styles.planRowValue}
                style={{ color: planInfo.color, fontWeight: 700 }}
              >
                {planInfo.label}
              </span>
            </div>
            <div className={styles.planRow}>
              <span className={styles.planRowLabel}>Limite de produtos</span>
              <span className={styles.planRowValue}>
                {company.planLimitText}
              </span>
            </div>
            {company.planExpiresAt && (
              <div className={styles.planRow}>
                <span className={styles.planRowLabel}>Expira em</span>
                <span className={styles.planRowValue}>
                  <Calendar size={14} />
                  {formatDate(company.planExpiresAt)}
                </span>
              </div>
            )}
          </div>

          {usagePercent !== null && (
            <div
              className={`${styles.usageCard} ${isAtLimit ? styles.usageDanger : isNearLimit ? styles.usageWarning : ""}`}
            >
              <div className={styles.usageInfo}>
                <span className={styles.usageLabel}>
                  {isAtLimit
                    ? "🚫 Limite atingido"
                    : isNearLimit
                      ? "⚠ Limite se aproximando"
                      : "Uso do plano"}
                </span>
                <span className={styles.usageValue}>
                  {s?.planUsage.current} / {s?.planUsage.limitText} (
                  {usagePercent}%)
                </span>
              </div>
              <div className={styles.usageBarWrapper}>
                <div
                  className={`${styles.usageBar} ${isAtLimit ? styles.usageBarDanger : isNearLimit ? styles.usageBarWarning : ""}`}
                  style={{ width: `${Math.min(usagePercent, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Package size={20} className={styles.cardHeaderIcon} />
            <h2 className={styles.cardTitle}>Produtos</h2>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span
                className={styles.statItemValue}
                style={{ color: "var(--color-primary)" }}
              >
                {s?.products.total ?? "—"}
              </span>
              <span className={styles.statItemLabel}>Total</span>
            </div>
            <div className={styles.statItem}>
              <span
                className={styles.statItemValue}
                style={{ color: "var(--color-success)" }}
              >
                {s?.products.inStock ?? "—"}
              </span>
              <span className={styles.statItemLabel}>Em estoque</span>
            </div>
            <div className={styles.statItem}>
              <span
                className={styles.statItemValue}
                style={{ color: "var(--color-warning)" }}
              >
                {s?.products.lowStock ?? "—"}
              </span>
              <span className={styles.statItemLabel}>Estoque baixo</span>
            </div>
            <div className={styles.statItem}>
              <span
                className={styles.statItemValue}
                style={{ color: "var(--color-danger)" }}
              >
                {s?.products.outOfStock ?? "—"}
              </span>
              <span className={styles.statItemLabel}>Esgotados</span>
            </div>
          </div>
        </div>

        <div className={`${styles.card} ${styles.cardWide}`}>
          <div className={styles.cardHeader}>
            <Users size={20} className={styles.cardHeaderIcon} />
            <h2 className={styles.cardTitle}>
              Membros
              <span className={styles.memberCount}>{company.users.length}</span>
            </h2>
            {isOwner && !showAddForm && (
              <button
                className={styles.addMemberButton}
                onClick={() => setShowAddForm(true)}
              >
                <UserPlus size={16} />
                Adicionar membro
              </button>
            )}
          </div>

          {showAddForm && (
            <AddMemberForm onClose={() => setShowAddForm(false)} />
          )}

          <div className={styles.memberList}>
            {company.users.map((user) => (
              <MemberRow
                key={user.id}
                user={user}
                isOwner={isOwner}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

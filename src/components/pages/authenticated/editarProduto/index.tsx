import { useNavigate, useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Package, Trash2 } from "lucide-react";
import { toast } from "sonner";

import styles from "../novoProduto/styles.module.css";
import {
  productSchema,
  type ProductFormData,
} from "../../../../schemas/product.schema";
import { useProduct } from "../../../../hooks/useProduct";
import { useUpdateProduct } from "../../../../hooks/useUpdateProduct";
import { useDeleteProduct } from "../../../../hooks/useDeleteProduct";
import { FormInput } from "../../../ui/form/formInput";
import { FormSelect } from "../../../ui/form/formSelect";
import { FormButton } from "../../../ui/form/formButton/formButton";

const CATEGORY_OPTIONS = [
  { value: "Roupas", label: "Roupas" },
  { value: "Eletrônicos", label: "Eletrônicos" },
  { value: "Alimentos", label: "Alimentos" },
  { value: "Outros", label: "Outros" },
];

export function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams({
    from: "/_authenticated/_has-company/produtos/$id",
  });

  const { data: product, isLoading } = useProduct(id);
  const { mutate: update, isPending: isUpdating } = useUpdateProduct(id);
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    values: product
      ? {
          name: product.name,
          description: product.description || "",
          price: product.price,
          quantity: product.quantity,
          lowStockThreshold: product.lowStockThreshold,
          category: product.category || "",
          sku: product.sku || "",
        }
      : undefined,
  });

  const onSubmit = (data: ProductFormData) => {
    update(data);
  };

  const handleDelete = () => {
    toast(`Remover "${product?.name}"?`, {
      description: "Esta ação não pode ser desfeita.",
      action: {
        label: "Remover",
        onClick: () =>
          deleteProduct(id, {
            onSuccess: () =>
              navigate({ to: "/produtos", search: { page: "1" } }),
          }),
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {},
      },
    });
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Carregando produto...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate({ to: "/produtos", search: { page: "1" } })}
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>Editar Produto</h1>
            <p className={styles.subtitle}>
              Atualize as informações do produto
            </p>
          </div>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 size={18} />
            {isDeleting ? "Removendo..." : "Remover"}
          </button>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <Package size={24} />
            </div>
            <div>
              <h2 className={styles.cardTitle}>Informações do Produto</h2>
              <p className={styles.cardSubtitle}>Edite os dados do produto</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            <FormInput
              label="Nome do Produto *"
              name="name"
              placeholder="Ex: Camiseta Polo"
              register={register}
              error={errors.name}
            />

            <FormSelect
              label="Categoria"
              name="category"
              placeholder="Selecione uma categoria"
              options={CATEGORY_OPTIONS}
              register={register}
              error={errors.category}
            />

            <FormInput
              label="SKU (Código)"
              name="sku"
              placeholder="Ex: POLO-001"
              register={register}
              error={errors.sku}
            />

            <FormInput
              label="Preço (R$) *"
              name="price"
              type="number"
              registerOptions={{ valueAsNumber: true }}
              placeholder="0.00"
              register={register}
              error={errors.price}
            />

            <FormInput
              label="Quantidade em Estoque *"
              name="quantity"
              type="number"
              registerOptions={{ valueAsNumber: true }}
              placeholder="0"
              register={register}
              error={errors.quantity}
            />

            <FormInput
              label="Alerta de Estoque Baixo"
              name="lowStockThreshold"
              type="number"
              registerOptions={{ valueAsNumber: true }}
              placeholder="5"
              register={register}
              error={errors.lowStockThreshold}
              hint="Você será alertado quando o estoque atingir este valor"
            />

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <FormInput
                label="Descrição"
                name="description"
                placeholder="Descreva o produto..."
                register={register}
                error={errors.description}
                multiline
              />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <FormButton
            variant="secondary"
            type="button"
            onClick={() => navigate({ to: "/produtos", search: { page: "1" } })}
          >
            Cancelar
          </FormButton>

          <FormButton isLoading={isUpdating}>Salvar Alterações</FormButton>
        </div>
      </form>
    </div>
  );
}

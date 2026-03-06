import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Package } from "lucide-react";

import styles from "./styles.module.css";
import {
  productSchema,
  type ProductFormData,
} from "../../../../schemas/product.schema";
import { useCreateProduct } from "../../../../hooks/useCreateProduct";
import { FormInput } from "../../../ui/form/formInput";
import { FormSelect } from "../../../ui/form/formSelect";
import { FormButton } from "../../../ui/form/formButton/formButton";

const CATEGORY_OPTIONS = [
  { value: "Roupas", label: "Roupas" },
  { value: "Eletrônicos", label: "Eletrônicos" },
  { value: "Alimentos", label: "Alimentos" },
  { value: "Outros", label: "Outros" },
];

export function NovoProduto() {
  const navigate = useNavigate();
  const { mutate: create, isPending } = useCreateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      lowStockThreshold: 5,
      quantity: 0,
    },
  });

  const onSubmit = (data: ProductFormData) => {
    create(data);
  };

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
        <div>
          <h1 className={styles.title}>Novo Produto</h1>
          <p className={styles.subtitle}>
            Adicione um novo produto ao seu estoque
          </p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <Package size={24} />
            </div>
            <div>
              <h2 className={styles.cardTitle}>Informações Básicas</h2>
              <p className={styles.cardSubtitle}>
                Preencha os dados principais do produto
              </p>
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

          <FormButton isLoading={isPending}>Criar Produto</FormButton>
        </div>
      </form>
    </div>
  );
}

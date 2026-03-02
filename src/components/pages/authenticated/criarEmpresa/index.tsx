import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Sparkles, TrendingUp, Shield } from "lucide-react";

import styles from "./styles.module.css";
import { useAuthStore } from "../../../../stores/useAuthStore";
import { FormButton } from "../../../ui/form/formButton/formButton";
import { FormInput } from "../../../ui/form/formInput";
import {
  companySchema,
  type CompanyFormData,
} from "../../../../schemas/company.schema";
import { useCreateCompany } from "../../../../hooks/useCreateCompany";

export function CriarEmpresa() {
  const user = useAuthStore((state) => state.user);

  const { mutate: create, isPending } = useCreateCompany();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = (data: CompanyFormData) => {
    create(data);
  };

  return (
    <div className={"container"}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>Bem-vindo(a), {user?.name?.split(" ")[0]}!</span>
          </div>

          <h1 className={styles.title}>
            Crie sua empresa e comece a gerenciar seu estoque
          </h1>

          <p className={styles.subtitle}>
            Você está a um passo de transformar a gestão do seu negócio. Escolha
            um nome para sua empresa e aproveite o plano FREE com até 20
            produtos.
          </p>
        </div>

        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formHeader}>
              <div className={styles.iconCircle}>
                <Building2 size={32} />
              </div>
              <h2 className={styles.formTitle}>Dados da Empresa</h2>
            </div>

            <FormInput
              label="Nome da Empresa"
              name="name"
              type="text"
              placeholder="Ex: Loja do João"
              register={register}
              error={errors.name}
            />

            <div className={styles.submitButton}>
              <FormButton isLoading={isPending}>
                {isPending ? "Criando empresa..." : "Criar Empresa"}
              </FormButton>
            </div>

            <p className={styles.hint}>
              Você poderá alterar essas informações depois nas configurações
            </p>
          </form>

          <div className={styles.benefits}>
            <h3 className={styles.benefitsTitle}>
              O que você ganha no Plano FREE
            </h3>

            <div className={styles.benefitsList}>
              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <TrendingUp size={20} />
                </div>
                <div className={styles.benefitContent}>
                  <h4>Até 20 produtos</h4>
                  <p>Cadastre e gerencie produtos com controle de estoque</p>
                </div>
              </div>

              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <Shield size={20} />
                </div>
                <div className={styles.benefitContent}>
                  <h4>Dashboard completo</h4>
                  <p>Visualize estatísticas e alertas de estoque baixo</p>
                </div>
              </div>

              <div className={styles.benefit}>
                <div className={styles.benefitIcon}>
                  <Sparkles size={20} />
                </div>
                <div className={styles.benefitContent}>
                  <h4>Upgrade quando quiser</h4>
                  <p>Mude para planos maiores conforme seu negócio cresce</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

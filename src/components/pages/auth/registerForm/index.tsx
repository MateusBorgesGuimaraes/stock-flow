import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles.module.css";
import {
  registerSchema,
  type RegisterFormData,
} from "../../../../schemas/register.schema";
import { FormInput } from "../../../ui/form/formInput";
import { FormCheckbox } from "../../../ui/form/formCheckbox";
import { FormButton } from "../../../ui/form/formButton/formButton";
import { useRegister } from "../../../../hooks/useRegister";

export function RegisterForm() {
  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    registerUser({
      email: data.email,
      name: data.name,
      password: data.password,
    });
  };

  return (
    <>
      <h1 className={styles.title}>Criar sua conta</h1>
      <p className={styles.subtitle}>
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </p>

      <div className={styles.divider}>
        <span>//</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Nome completo"
          name="name"
          placeholder="João Silva"
          register={register}
          error={errors.name}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          register={register}
          error={errors.email}
        />

        <FormInput
          label="Senha"
          name="password"
          type="password"
          placeholder="••••••••"
          register={register}
          error={errors.password}
        />

        <div className={styles.termsGroup}>
          <FormCheckbox
            name="terms"
            label="Aceito os termos de uso e política de privacidade"
            register={register}
          />
          {errors.terms && (
            <span className={styles.errorMessage}>
              ⚠ {errors.terms.message}
            </span>
          )}
        </div>

        <FormButton isLoading={isPending}>Criar conta grátis</FormButton>
      </form>
    </>
  );
}

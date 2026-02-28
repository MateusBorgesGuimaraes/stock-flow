import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles.module.css";
import {
  loginSchema,
  type LoginFormData,
} from "../../../../schemas/login.schema";
import { FormInput } from "../../../ui/form/formInput";
import { FormCheckbox } from "../../../ui/form/formCheckbox";
import { FormButton } from "../../../ui/form/formButton/formButton";
import { useLogin } from "../../../../hooks/useLogin";

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <h1 className={styles.title}>Entrar na sua conta</h1>
      <p className={styles.subtitle}>
        Não tem uma conta? <Link to="/register">Criar conta grátis</Link>
      </p>

      <div className={styles.divider}>
        <span>//</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

        <div className={styles.helper}>
          <FormCheckbox
            name="remember"
            label="Lembrar de mim"
            register={register}
          />

          <Link to="/" className={styles.link}>
            Esqueci minha senha
          </Link>
        </div>

        <FormButton isLoading={isPending}>Entrar</FormButton>
      </form>
    </>
  );
}

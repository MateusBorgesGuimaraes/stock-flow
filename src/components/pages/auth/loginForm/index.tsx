import { useState } from "react";
import { Link } from "@tanstack/react-router";
import styles from "./styles.module.css";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log("Login:", { email, password, remember });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError("Email ou senha incorretos");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Senha
          </label>
          <input
            type="password"
            id="password"
            className={`${styles.input} ${error ? styles.error : ""}`}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <span className={styles.errorMessage}>⚠ {error}</span>}
        </div>

        <div className={styles.helper}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="remember"
              className={styles.checkbox}
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember" className={styles.checkboxLabel}>
              Lembrar de mim
            </label>
          </div>

          <Link to="/" className={styles.link}>
            Esqueci minha senha
          </Link>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
          {!isLoading && <span>→</span>}
        </button>
      </form>
    </>
  );
}

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import styles from "./styles.module.css";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!terms) {
      setError("Você precisa aceitar os termos de uso");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Register:", { name, email, password });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Nome completo
          </label>
          <input
            type="text"
            id="name"
            className={styles.input}
            placeholder="João Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            className={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <span className={styles.helperText}>Mínimo 8 caracteres</span>
        </div>

        <div className={styles.termsGroup}>
          <input
            type="checkbox"
            id="terms"
            className={styles.checkbox}
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            required
          />
          <label htmlFor="terms" className={styles.termsLabel}>
            Aceito os <a href="/terms">termos de uso</a> e{" "}
            <a href="/privacy">política de privacidade</a>
          </label>
        </div>

        {error && <span className={styles.errorMessage}>⚠ {error}</span>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Criando conta..." : "Criar conta grátis"}
          {!isLoading && <span>→</span>}
        </button>
      </form>
    </>
  );
}

import type { FieldError, UseFormRegister } from "react-hook-form";
import styles from "./styles.module.css";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
}

export function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
}: FormInputProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.error : ""}`}
        {...register(name)}
      />

      {error && <span className={styles.errorMessage}>⚠ {error.message}</span>}
    </div>
  );
}

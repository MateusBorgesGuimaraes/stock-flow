import type {
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import styles from "./styles.module.css";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  multiline?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
}

export function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  hint,
  multiline = false,
  register,
  registerOptions,
  error,
}: FormInputProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      {multiline ? (
        <textarea
          id={name}
          rows={4}
          placeholder={placeholder}
          className={`${styles.textarea} ${error ? styles.error : ""}`}
          {...register(name)}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.error : ""}`}
          {...register(name, registerOptions)}
        />
      )}

      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && <span className={styles.errorMessage}>⚠ {error.message}</span>}
    </div>
  );
}

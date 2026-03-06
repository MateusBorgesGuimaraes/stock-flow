import type { FieldError, UseFormRegister } from "react-hook-form";
import styles from "../formInput/styles.module.css";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: FieldError;
}

export function FormSelect({
  label,
  name,
  options,
  placeholder,
  register,
  error,
}: FormSelectProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        id={name}
        className={`${styles.select} ${error ? styles.error : ""}`}
        {...register(name)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorMessage}>⚠ {error.message}</span>}
    </div>
  );
}

import type { UseFormRegister } from "react-hook-form";
import styles from "./styles.module.css";

interface Props {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

export function FormCheckbox({ name, label, register }: Props) {
  return (
    <div className={styles.checkboxGroup}>
      <input
        type="checkbox"
        id={name}
        className={styles.checkbox}
        {...register(name)}
      />
      <label htmlFor={name} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  );
}

import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { MediaFileFormValues } from '../../model/types';
import styles from '../MediaFileForm.module.css';

type Props = {
  register: UseFormRegister<MediaFileFormValues>;
  value: string;
  errorMessage?: string;
  hasError?: boolean;
};

export const NameField: React.FC<Props> = ({
  register,
  value,
  errorMessage,
  hasError,
}) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Наименование файла*</label>
      <input
        type="text"
        className={hasError ? styles.inputError : styles.input}
        value={value}
        {...register('name')}
      />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

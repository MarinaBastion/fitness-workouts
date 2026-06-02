import React from 'react';
import {
  Controller,
  Control,
  UseFormTrigger,
} from 'react-hook-form';
import { MediaFileFormValues } from '../../model/types';
import styles from '../MediaFileForm.module.css';

type Props = {
  control: Control<MediaFileFormValues>;
  trigger: UseFormTrigger<MediaFileFormValues>;
  errorMessage?: string;
  hasError?: boolean;
};

export const ShortVideoField: React.FC<Props> = ({
  control,
  trigger,
  errorMessage,
  hasError,
}) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Короткое видео (до 3 секунд)</label>
      <Controller
        name="shortVideo"
        control={control}
        render={({ field }) => (
          <input
            type="file"
            accept="video/*"
            className={hasError ? styles.fileInputError : styles.fileInput}
            onChange={async (e) => {
              const file = e.target.files?.[0] ?? null;
              field.onChange(file);

              if (file) {
                await trigger('shortVideo');
              }
            }}
          />
        )}
      />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

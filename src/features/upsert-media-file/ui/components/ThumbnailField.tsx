import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { MediaFileFormValues } from '../../model/types';
import styles from '../MediaFileForm.module.css';

type Props = {
  control: Control<MediaFileFormValues>;
  errorMessage?: string;
  hasError?: boolean;
};

export const ThumbnailField: React.FC<Props> = ({
  control,
  errorMessage,
  hasError,
}) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Thumbnail</label>
      <Controller
        name="thumbnail"
        control={control}
        render={({ field }) => (
          <input
            type="file"
            accept="image/*"
            className={hasError ? styles.fileInputError : styles.fileInput}
            onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
          />
        )}
      />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

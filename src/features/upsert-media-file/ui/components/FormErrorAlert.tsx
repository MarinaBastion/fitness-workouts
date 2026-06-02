import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { MediaFileFormValues } from '../../model/types';
import styles from '../MediaFileForm.module.css';

type Props = {
  errors: FieldErrors<MediaFileFormValues>;
};

const fieldTitles: Record<string, string> = {
  name: 'Название',
  description: 'Описание',
  categoryIds: 'Категория',
  shortVideo: 'Короткое видео',
  thumbnail: 'Thumbnail',
};

export const FormErrorAlert: React.FC<Props> = ({ errors }) => {
  const errorEntries = Object.entries(errors).filter(([, value]) => Boolean(value?.message));

  if (!errorEntries.length) {
    return null;
  }

  return (
    <div className={styles.errorAlert}>
      <div className={styles.errorAlertHeader}>
        <span className={styles.errorAlertIcon}>!</span>
        <strong>При сохранении обнаружены ошибки:</strong>
      </div>
      <ul className={styles.errorList}>
        {errorEntries.map(([field, value]) => (
          <li key={field}>
            <span className={styles.errorFieldName}>{fieldTitles[field] ?? field}:</span>{' '}
            {value?.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

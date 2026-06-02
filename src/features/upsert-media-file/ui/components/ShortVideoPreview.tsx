import React from 'react';
import styles from '../MediaFileForm.module.css';

type Props = {
  url: string | null;
  hasError: boolean;
};

export const ShortVideoPreview: React.FC<Props> = ({ url, hasError }) => {
  if (!url || hasError) {
    return null;
  }

  return (
    <div className={styles.preview}>
      <label>Превью короткого видео</label>
      <video className={styles.previewVideo} src={url} controls />
    </div>
  );
};

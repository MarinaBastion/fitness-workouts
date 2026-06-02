import React from 'react';
import styles from '../MediaFileForm.module.css';

type Props = {
  url: string | null;
};

export const ThumbnailPreview: React.FC<Props> = ({ url }) => {
  if (!url) {
    return null;
  }

  return (
    <div className={styles.preview}>
      <label>Аватарка для видео</label>
      <img src={url} className={styles.previewImage} />
    </div>
  );
};

import React from 'react';
import styles from '../MediaFileForm.module.css';

type Props = {
  filePath: string;
};

export const MainVideoPreview: React.FC<Props> = ({ filePath }) => {
  return (
    <div className={styles.preview}>
      <video className={styles.previewVideo} src={filePath} controls />
    </div>
  );
};

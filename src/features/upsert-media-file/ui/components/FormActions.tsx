import React from 'react';
import { Button } from '@/shared/ui/Button/Button';
import styles from '../MediaFileForm.module.css';

type Props = {
  isSubmitting: boolean;
  onCancel?: () => void;
};

export const FormActions: React.FC<Props> = ({ isSubmitting, onCancel }) => {
  return (
    <div className={styles.actions}>
      <Button type="submit" disabled={isSubmitting}>
        Сохранить
      </Button>
      <Button type="button" variant="secondary" onClick={onCancel}>
        Отменить
      </Button>
    </div>
  );
};

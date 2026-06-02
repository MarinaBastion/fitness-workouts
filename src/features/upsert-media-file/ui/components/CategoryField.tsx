import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Combobox, Option } from '@fluentui/react-components';
import { MediaFileFormValues } from '../../model/types';
import styles from '../MediaFileForm.module.css';

type Category = {
  id: string;
  name: string;
};

type Props = {
  control: Control<MediaFileFormValues>;
  categories: Category[];
  selectedCategoryNames: string[];
  errorMessage?: string;
  hasError?: boolean;
};

export const CategoryField: React.FC<Props> = ({
  control,
  categories,
  selectedCategoryNames,
  errorMessage,
  hasError,
}) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Категория</label>
      <Controller
        name="categoryIds"
        control={control}
        render={({ field }) => (
          <Combobox
            placeholder="Выберите категорию"
            className={hasError ? styles.comboError : styles.combo}
            multiselect
            selectedOptions={field.value ?? []}
            value={selectedCategoryNames.join(', ')}
            onOptionSelect={(_, data) => field.onChange(data.selectedOptions ?? [])}
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Combobox>
        )}
      />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};

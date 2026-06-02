import React, { useMemo, useState } from 'react';
import { VideoCategory } from '@/entities/video-category/model/type';
import styles from './videoEditorCategoriesWidget.module.css';

interface VideoEditorCategoriesWidgetProps {
  categories: VideoCategory[];
  selectedCategoryIds: string[];
  isLoading: boolean;
  isError: boolean;
  onToggleCategory: (categoryId: string) => void;
}

export const VideoEditorCategoriesWidget: React.FC<VideoEditorCategoriesWidgetProps> = ({
  categories,
  selectedCategoryIds,
  isLoading,
  isError,
  onToggleCategory,
}) => {
  const [search, setSearch] = useState('');

  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return categories;
    }

    return categories.filter((category) => category.name.toLowerCase().includes(term));
  }, [categories, search]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Категории</h2>

      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className={styles.searchInput}
        placeholder="Поиск категории"
      />

      {isLoading ? (
        <div className={styles.state}>Загрузка категорий...</div>
      ) : isError ? (
        <div className={styles.state}>Не удалось загрузить категории</div>
      ) : filteredCategories.length === 0 ? (
        <div className={styles.state}>Ничего не найдено</div>
      ) : (
        <div className={styles.chipsGrid}>
          {filteredCategories.map((category) => {
            const isChecked = selectedCategoryIds.includes(category.id);

            return (
              <button
                key={category.id}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => onToggleCategory(category.id)}
                className={styles.chip}
              >
                <span className={isChecked ? `${styles.check} ${styles.checkActive}` : styles.check}>
                  {isChecked ? '✓' : ''}
                </span>
                <span className={styles.label}>{category.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

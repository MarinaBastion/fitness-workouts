import { useState } from 'react';
import { VideoCategory } from '@/entities/video-category';
import { useGetVideocategoriesQuery } from '@/entities/video-category/api/videoCategoryApi';
import { VideoCategoryForm } from '@/features/upsert-video-category/ui/VideoCategoryFrom';
import styles from './videoCategoriesListForm.module.css';

export const VideoCatrgoriesListForm = () => {
  const { data: categories , isLoading, isError } = useGetVideocategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | undefined>();

  return (
    <div className={styles.form}>
      

      <div className={styles.categories}>
        <h3>Категории</h3>
        {isLoading ? (
          <div className={styles.empty}>Загрузка категорий...</div>
        ) : isError ? (
          <div className={styles.empty}>Не удалось загрузить категории.</div>
        ) : categories.content.length === 0 ? (
          <div className={styles.empty}>Категории пока не созданы.</div>
        ) : (
          <ul className={styles.list}>
            {(categories.content as VideoCategory[]).map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  className={
                    selectedCategory?.id === category.id
                      ? `${styles.categoryButton} ${styles.categoryButtonActive}`
                      : styles.categoryButton
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <VideoCategoryForm
        initialData={selectedCategory}
        onSuccess={() => setSelectedCategory(undefined)}
      />
    </div>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import { useGetVideocategoriesQuery } from '@/entities/video-category/api/videoCategoryApi';
import { VideoEditorCategoriesWidget } from '@/widgets/video-editor-categories';
import { VideoEditorMediaListWidget } from '@/widgets/video-editor-media-list';
import styles from './videoEditorPage.module.css';

export const VideoEditorPage: React.FC = () => {
  const { data: categoriesResponse, isLoading, isError } = useGetVideocategoriesQuery();
  const categories = categoriesResponse?.content ?? [];
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }

    setSelectedCategoryIds((prev) => {
      if (prev.length > 0) {
        return prev;
      }

      return categories.map((category) => category.id);
    });
  }, [categories]);

  const selectedCategoriesKey = useMemo(() => {
    return selectedCategoryIds.slice().sort().join(',');
  }, [selectedCategoryIds]);

  const handleToggleCategory = (categoryId: string) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }

      return [...prev, categoryId];
    });
  };

  return (
    <div className={styles.page}>
      <VideoEditorCategoriesWidget
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        isLoading={isLoading}
        isError={isError}
        onToggleCategory={handleToggleCategory}
      />

      <VideoEditorMediaListWidget
        key={selectedCategoriesKey || 'no-categories'}
        categoryIds={selectedCategoryIds}
        isReady={!isLoading && !isError}
      />
    </div>
  );
};

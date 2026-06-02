import React, { useState, useEffect, useMemo } from 'react';
import { useGetMediaFilesQuery, extractMediaFiles } from '@/entities/media-file/api/mediaApi';
import { MediaFile } from '@/entities/media-file/model/media-file';
import { VideoListItem } from './VideoListItem';
import { useVirtualizedList } from '@/shared/hooks/useVirtualizedList';
import styles from './videoEditorMediaListWidget.module.css';
//TODO: move to constants

const PAGE_SIZE = 40;
const ITEM_HEIGHT = 140;

export const VideoEditorMediaListWidget = ({
  categoryIds,
  isReady,
}: {
  categoryIds: string[];
  isReady: boolean;
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const params = useMemo(
    () => ({ CategoryIds: categoryIds, PageNumber: pageNumber, PageSize: PAGE_SIZE }),
    [categoryIds, pageNumber]
  );

  const shouldSkip = !isReady || categoryIds.length === 0;

  const { data, isLoading, isFetching, isError } = useGetMediaFilesQuery(params, { skip: shouldSkip });

  useEffect(() => {
    if (!data) return;

    const pageItems = extractMediaFiles(data);
    setTotalCount(data.content.totalCount ?? 0);
    setVideos((prev) => (pageNumber === 1 ? pageItems : [...prev, ...pageItems]));
  }, [data, pageNumber]);

  const hasMore = videos.length < totalCount;

  const { scrollRef, virtualItems, totalSize } = useVirtualizedList({
    items: videos,
    itemHeight: ITEM_HEIGHT,
    loadMore: hasMore && !isFetching ? () => setPageNumber((prev) => prev + 1) : undefined,
  });

  if (shouldSkip) return <div className={styles.state}>Выберите хотя бы одну категорию</div>;
  if (isLoading && videos.length === 0) return <div className={styles.state}>Загрузка видео...</div>;
  if (isError) return <div className={styles.state}>Не удалось загрузить видео</div>;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Видео</h2>

      <div ref={scrollRef} style={{ height: 500, overflow: 'auto' }}>
        <div style={{ height: totalSize, position: 'relative' }}>
          {virtualItems.map((virtualRow: { index: number; start: number; }) => {
            const file = videos[virtualRow.index];
            if (!file) return null;

            return (
              <div
                key={file.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <VideoListItem file={file} index={virtualRow.index + 1} />
              </div>
            );
          })}
        </div>
      </div>

      {isFetching && <div className={styles.state}>Подгружаем ещё...</div>}
      {!isFetching && videos.length === 0 && <div className={styles.state}>Видео не найдены</div>}
    </section>
  );
};

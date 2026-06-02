import React, { useMemo, useRef, useState } from 'react';
import { Button } from '@fluentui/react-components';
import { useAppSelector } from '../../../app/hooks';
import { selectUploadedMediaFiles } from '../../../features/file-upload/model/fileUploadSelectors';
import { MediaFile } from '../../../entities/media-file/model/media-file';
import { MediaFileForm } from '../../../features/upsert-media-file/ui/MediaFileForm';
import { ModalForm } from '../../../shared/widgets/modal';
import styles from './uploadedMediaCarousel.module.css';

const SCROLL_STEP = 240;

export const UploadedMediaCarousel: React.FC = () => {
  const uploadedMediaFiles = useAppSelector(selectUploadedMediaFiles);
  const videoFiles = useMemo(
    () => uploadedMediaFiles.filter((file) => file.mimeType.startsWith('video/')),
    [uploadedMediaFiles]
  );
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }
    const delta = direction === 'left' ? -SCROLL_STEP : SCROLL_STEP;
    node.scrollBy({ left: delta, behavior: 'smooth' });
  };

  if (videoFiles.length === 0) {
    return (
      <div className={styles.empty}>
        Загруженные видео появятся здесь после загрузки.
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>Выбранные видео</h3>
        {/* <div className={styles.controls}>
          <Button appearance="subtle" size="small" onClick={() => handleScroll('left')}>
            ⟵
          </Button>
          <Button appearance="subtle" size="small" onClick={() => handleScroll('right')}>
            ⟶
          </Button>
        </div> */}
      </div>
      <div className={styles.carousel} ref={scrollRef}>
        {videoFiles.map((file) => (
          <button
            key={file.id}
            type="button"
            className={`${styles.card} ${editingFile?.id === file.id ? styles.cardActive : ''}`}
            onClick={() => setEditingFile(file)}
          >
            <video
              className={styles.thumb}
              src={file.filePath}
              muted
              preload="metadata"
            />
            <span className={styles.name}>{file.name}</span>
          </button>
        ))}
      </div>
      {editingFile && (
        <ModalForm
          modalContainerId="media-file-edit-modal"
          onClose={() => setEditingFile(null)}
        >
          <MediaFileForm
            initialData={editingFile}
            onSuccess={() => setEditingFile(null)}
          />
        </ModalForm>
      )}
    </section>
  );
};

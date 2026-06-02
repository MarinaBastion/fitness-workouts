import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Text } from '@fluentui/react-components';
import { MediaFile } from '../model/media-file';
import styles from './mediaCardFile.module.css';

interface MediaFileCardProps {
  file: MediaFile;
  isDragging?: boolean;
  onSelect?: (file: MediaFile) => void;
}

export const MediaFileCard: React.FC<MediaFileCardProps> = ({ 
  file, 
  isDragging = false,
  onSelect 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging
  } = useSortable({ 
    id: file.id,
    data: { type: 'media-file', file }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        className={styles.mediaFileCard}
        onClick={() => onSelect?.(file)}
      >
        {/* Превью/Thumbnail */}
        <div className={styles.thumbnail}>
          {file.thumbnailUrl ? (
            <img 
              src={file.thumbnailUrl} 
              alt={file.name}
              className={styles.thumbnailImage}
            />
          ) : (
            <div className={styles.thumbnailIcon}>
              {file.mimeType.startsWith('video/') ? '🎬' : '🎵'}
            </div>
          )}
          
          {/* Длительность */}
          <div className={styles.durationBadge}>
            {formatDuration(file.duration)}
          </div>
        </div>

        {/* Информация о файле */}
        <div className={styles.fileInfo}>
          <Text className={styles.fileName}>
            {file.name}
          </Text>
          
          <Text className={styles.fileSize}>
            {formatFileSize(file.size)}
          </Text>
          
          <Text className={styles.fileType}>
            {file.mimeType.split('/')[1]}
          </Text>
        </div>
      </Card>
    </div>
  );
};
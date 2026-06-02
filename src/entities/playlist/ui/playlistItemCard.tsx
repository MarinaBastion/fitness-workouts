import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Text, Button } from '@fluentui/react-components';
import { PlaylistItem } from '../model/playlist';
import { MediaFile } from '../../media-file/model/media-file';
import styles from './playlistItemCard.module.css'; // ✅ Импорт стилей

interface PlaylistItemCardProps {
  item: PlaylistItem;
  mediaFile?: MediaFile;
  isDragging?: boolean;
  onRemove?: (itemId: string) => void;
  onEdit?: (item: PlaylistItem) => void;
}

export const PlaylistItemCard: React.FC<PlaylistItemCardProps> = ({
  item,
  mediaFile,
  isDragging = false,
  onRemove,
  onEdit,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: item.id,
    data: { type: 'playlist-item', item },
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

  const formatTimeRange = () => {
    if (item.startTime !== undefined && item.endTime !== undefined) {
      return `${formatDuration(item.startTime)} - ${formatDuration(item.endTime)}`;
    }
    if (item.startTime !== undefined) {
      return `С ${formatDuration(item.startTime)}`;
    }
    if (item.endTime !== undefined) {
      return `До ${formatDuration(item.endTime)}`;
    }
    return 'Полное видео';
  };

  const fileName = mediaFile?.name || 'Загрузка...';
  const thumbnailUrl = mediaFile?.thumbnailUrl;
  const fileDuration = mediaFile?.duration || 0;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className={`${styles.playlistItemCard} ${isDragging ? styles.dragging : ''}`}>
        <div className={styles.content}>
          {/* Превью */}
          <div className={styles.thumbnail}>
            {thumbnailUrl ? (
              <img 
                src={thumbnailUrl} 
                alt={fileName}
                className={styles.thumbnailImage}
              />
            ) : (
              <div className={styles.thumbnailPlaceholder}>
                {mediaFile?.mimeType?.startsWith('video/') ? '🎬' : '🎵'}
              </div>
            )}
            
            {/* Порядковый номер */}
            <div className={styles.orderBadge}>
              {item.order}
            </div>
          </div>

          {/* Информация о файле */}
          <div className={styles.info}>
            <Text className={styles.fileName} weight="semibold">
              {fileName}
            </Text>
            
            <Text className={styles.timeRange} size={200}>
              {formatTimeRange()}
            </Text>
            
            {fileDuration > 0 && (
              <Text className={styles.duration} size={200}>
                Длительность: {formatDuration(fileDuration)}
              </Text>
            )}
          </div>

          {/* Действия */}
          <div className={styles.actions}>
            {onEdit && (
              <Button
                appearance="subtle"
                size="small"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  onEdit(item);
                }}
                title="Редактировать"
              >
                ✏️
              </Button>
            )}
            
            {onRemove && (
              <Button
                appearance="subtle"
                size="small"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                title="Удалить"
              >
                🗑️
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
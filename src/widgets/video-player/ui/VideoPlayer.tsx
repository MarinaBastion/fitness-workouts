// widgets/video-player/ui/VideoPlayer.tsx
import React, { useRef, useEffect, useState } from 'react';
import { PlaylistItem } from '../../../entities/playlist/model/playlist';
import { MediaFile } from '../../../entities/media-file/model/media-file';

interface VideoPlayerProps {
  playlistItems: PlaylistItem[];
  mediaFiles: MediaFile[]; // ✅ Добавляем массив медиафайлов
  currentItemIndex: number;
  onItemEnd: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  playlistItems,
  mediaFiles, // ✅ Получаем массив медиафайлов
  currentItemIndex,
  onItemEnd,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentItem = playlistItems[currentItemIndex];

  useEffect(() => {
    if (!currentItem || !videoRef.current) return;

    // ✅ Находим MediaFile по mediaFileId
    const mediaFile = mediaFiles.find(file => file.id === currentItem.mediaFileId);
    
    if (!mediaFile) {
      console.error('MediaFile not found for item:', currentItem.id);
      return;
    }

    const video = videoRef.current;
    
    // ✅ Используем filePath из найденного MediaFile
    video.src = mediaFile.filePath;
    
    // Устанавливаем время начала и окончания
    if (currentItem.startTime) {
      video.currentTime = currentItem.startTime;
    }
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Проверяем, достигли ли времени окончания
      if (currentItem.endTime && video.currentTime >= currentItem.endTime) {
        onItemEnd();
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      onItemEnd();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentItem, mediaFiles, onItemEnd]); // ✅ Добавляем mediaFiles в зависимости

  if (!currentItem) {
    return <div>Выберите видео для воспроизведения</div>;
  }

  // ✅ Находим MediaFile для отображения информации
  const mediaFile = mediaFiles.find(file => file.id === currentItem.mediaFileId);

  if (!mediaFile) {
    return <div>Медиафайл не найден</div>;
  }

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', maxHeight: '500px' }}
      />
      
      <div className="video-info">
        <h4>{mediaFile.name}</h4>
        <p>
          {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')} / 
          {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
};
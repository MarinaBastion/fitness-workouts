import { useState } from 'react';
import { DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { MediaFile } from '../../../entities/media-file/model/media-file';
import { getMediaFileById } from '@/entities/media-file/model/utils';
import { extractMediaFiles, useGetMediaFilesQuery } from '../../../entities/media-file/api/mediaApi';
import { useAddFileToPlaylistMutation } from '@/entities/playlist/api/playlistApi';

export const useMediaLibraryDragDrop = () => {
  const [activeFile, setActiveFile] = useState<MediaFile | null>(null);
  const { data: mediaFilesResponse } = useGetMediaFilesQuery();
  const mediafiles = extractMediaFiles(mediaFilesResponse);
  const [addFileToPlaylist] =  useAddFileToPlaylistMutation();
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const fileId = active.id as string;
    
    // Находим файл по ID (из контекста или store)
    const file = getMediaFileById(mediafiles,fileId);
    setActiveFile(file);
  };

  const handleDragOver = (event: DragOverEvent) =>{
    const { over } = event;
    if (!over) return;

    // Подсвечиваем drop-зону
    const overElement = over.data.current;
    if (overElement?.type === 'playlist') {
      // Можно добавить визуальный фидбек
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const fileId = active.id as string;
    const overData = over.data.current;

    // Если перетащили в плейлист
    if (overData?.type === 'playlist') {
      const playlistId = overData.playlistId;
      
      try {
        await addFileToPlaylist({
          playlistId,
          mediaFileId: fileId
        }).unwrap();
        
        console.log('Файл добавлен в плейлист');
      } catch (error) {
        console.error('Ошибка добавления в плейлист:', error);
      }
    }
  };

  
  return {
    activeFile,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

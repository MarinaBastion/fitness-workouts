import { useState } from 'react';
import { DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { useGetPlaylistQuery, useUpdatePlaylistItemsMutation } from '../../../entities/playlist/api/playlistApi';
import { PlaylistItem } from '../../../entities/playlist/model/playlist';
import { getPlaylistItemById } from '@/entities/playlist/model/utils';

export const useVideoPlaylistDragDrop = (playlistId: string) => {
  const [activeItem, setActiveItem] = useState<PlaylistItem | null>(null);
  const [updatePlaylistItems] = useUpdatePlaylistItemsMutation();
  const { data: playlist } = useGetPlaylistQuery(playlistId);  
  const playlistItems = playlist?.items || [];

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const itemId = active.id as string;
    
    const item = getPlaylistItemById(playlistItems,itemId);
    setActiveItem(item);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveItem(null);
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // Находим индексы элементов
    const oldIndex = playlistItems.findIndex(item => item.id === activeId);
    const newIndex = playlistItems.findIndex(item => item.id === overId);

    if (oldIndex === -1 || newIndex === -1) return;

    // Создаем новый порядок
    const newItems = [...playlistItems];
    const [movedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, movedItem);

    // Обновляем порядок в items
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    // Сохраняем в БД
    try {
      await updatePlaylistItems({
        playlistId,
        items: updatedItems
      }).unwrap();
    } catch (error) {
      console.error('Ошибка обновления плейлиста:', error);
    }
  };

  return {
    playlistItems,
    activeItem,
    handleDragStart,
    handleDragOver: () => {},
    handleDragEnd,
  };
};
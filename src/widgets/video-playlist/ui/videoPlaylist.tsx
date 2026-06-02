import React from 'react';
import { DndContext, DragOverlay, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { PlaylistItemCard } from '../../../entities/playlist/ui/playlistItemCard';
import { useVideoPlaylistDragDrop } from '../../../features/media-drag-drop/model/useVideoPlaylistDragDrop';

interface VideoPlaylistProps {
  playlistId: string;
}

export const VideoPlaylist: React.FC<VideoPlaylistProps> = ({ playlistId }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'playlist-dropzone',
    data: { type: 'playlist' }
  });
  
  const {
    playlistItems,
    activeItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useVideoPlaylistDragDrop(playlistId);

  return (
    <div className="video-playlist">
      <h3>Плейлист</h3>
      
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div
          ref={setNodeRef}
          className={`playlist-container ${isOver ? 'drag-over' : ''}`}
        >
          <SortableContext 
            items={playlistItems.map(item => item.id)} 
            strategy={verticalListSortingStrategy}
          >
            {playlistItems.length === 0 ? (
              <div className="empty-playlist">
                Перетащите видео сюда для создания плейлиста
              </div>
            ) : (
              playlistItems.map(item => (
                <PlaylistItemCard key={item.id} item={item} />
              ))
            )}
          </SortableContext>
        </div>
        
        <DragOverlay>
          {activeItem ? (
            <PlaylistItemCard item={activeItem} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
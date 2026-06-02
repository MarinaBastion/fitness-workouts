import React from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { extractMediaFiles, useGetMediaFilesQuery } from '../../../entities/media-file/api/mediaApi';
import { MediaFileCard } from '../../../entities/media-file/ui/mediaFileCard';
import { FileUploadZone } from '../../../features/file-upload/ui/fileUploadZone';
import { useMediaLibraryDragDrop } from '../../../features/media-drag-drop/model/useMediaLibraryDragDrop';

export const MediaLibrary: React.FC = () => {
  const { data: mediaFilesResponse, isLoading } = useGetMediaFilesQuery();
  const mediaFiles = extractMediaFiles(mediaFilesResponse);
  const {
    activeFile,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useMediaLibraryDragDrop();

  if (isLoading) return <div>Загрузка медиатеки...</div>;

  return (
    <div >
      <h2>Медиатека</h2>
      
      <FileUploadZone />
      
      {/* <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={mediaFiles.map(f => f.id)} 
          strategy={verticalListSortingStrategy}
        >
          <div className="media-grid">
            {mediaFiles.map(file => (
              <MediaFileCard key={file.id} file={file} />
            ))}
          </div>
        </SortableContext>
        
        <DragOverlay>
          {activeFile ? (
            <MediaFileCard file={activeFile} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext> */}
    </div>
  );
};

import React, { useCallback, useState } from 'react';
import { MediaLibrary } from '../../../widgets/media-library/ui/mediaLibrary';
import { VideoPlaylist } from '../../../widgets/video-playlist/ui/videoPlaylist';
import { VideoPlayer } from '../../../widgets/video-player/ui/VideoPlayer';
import { useVideoPlaylist } from '../../../widgets/video-playlist';
import { extractMediaFiles, useGetMediaFilesQuery } from '../../../entities/media-file/api/mediaApi';
import { UploadedMediaCarousel } from '../../../widgets/uploaded-media-carousel';
import { VideoCatrgoriesListForm } from '../../../features/category/ui/VideoCatrgoriesListForm';
import { useAppSelector } from '../../../app/hooks';
import { selectUploadedMediaFiles } from '../../../features/file-upload/model/fileUploadSelectors';
import { useChunkedMediaUpload } from '../../../features/file-upload/model/useChunkedMediaUpload';
import  Style  from './mediaLibraryPage.module.css';

export const MediaLibraryPage: React.FC = () => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const uploadedMediaFiles = useAppSelector(selectUploadedMediaFiles);
  const { uploadFile } = useChunkedMediaUpload();
  
  // Получаем медиафайлы для передачи в VideoPlayer
  const { data: mediaFilesResponse, refetch: refetchMediaFiles } = useGetMediaFilesQuery();
  const mediaFiles = extractMediaFiles(mediaFilesResponse);
  
  const {
    playlistItems,
    currentItemIndex,
    currentItem,
    isPlaying,
    playNext,
    playPrevious,
    togglePlay,
    handleItemEnd,
    isLoading,
  } = useVideoPlaylist({ playlistId: selectedPlaylistId });
  
  console.log(Style)

  const createFileFromUrl = useCallback(
    async (
      url: string,
      fallbackName: string,
      fallbackType = 'application/octet-stream'
    ): Promise<File> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Не удалось прочитать файл по ссылке: ${url}`);
      }

      const blob = await response.blob();
      return new File([blob], fallbackName, {
        type: blob.type || fallbackType,
      });
    },
    []
  );

  const handleSendToServer = useCallback(async () => {
    if (uploadedMediaFiles.length === 0 || isSending) {
      return;
    }

    setIsSending(true);
    setSendError(null);
    setIsSendSuccess(false);

    try {
      for (const mediaFile of uploadedMediaFiles) {
        const response = await fetch(mediaFile.filePath);
        if (!response.ok) {
          throw new Error(`Не удалось прочитать файл ${mediaFile.name}`);
        }

        const blob = await response.blob();
        const file = new File([blob], mediaFile.originalName || mediaFile.name, {
          type: mediaFile.mimeType || blob.type || 'application/octet-stream',
        });

        const categoryIds = (mediaFile.categories ?? [])
          .map((category) => category.id)
          .filter((value, index, arr) => value.length > 0 && arr.indexOf(value) === index);

        const shortVideo = mediaFile.shortVideoUrl
          ? await createFileFromUrl(
              mediaFile.shortVideoUrl,
              `${mediaFile.name}-short.mp4`,
              'video/mp4'
            )
          : undefined;

        const thumbnail = mediaFile.thumbnailUrl
          ? await createFileFromUrl(
              mediaFile.thumbnailUrl,
              `${mediaFile.name}-thumbnail.jpg`,
              'image/jpeg'
            )
          : undefined;

        await uploadFile(file, categoryIds, { shortVideo, thumbnail });
      }

      setIsSendSuccess(true);
      refetchMediaFiles();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Не удалось отправить данные';
      setSendError(errorMessage);
    } finally {
      setIsSending(false);
    }
  }, [createFileFromUrl, uploadedMediaFiles, isSending, refetchMediaFiles, uploadFile]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={Style.mediaLibraryPage}>
     
        <MediaLibrary />
        <div className="main-content">
          <VideoCatrgoriesListForm />
          <UploadedMediaCarousel />
          <div className="upload-actions">
            <button
              type="button"
              onClick={handleSendToServer}
              disabled={isSending || uploadedMediaFiles.length === 0}
            >
              {isSending ? 'Отправка...' : 'Отправить на сервер'}
            </button>
            {sendError && <div>{sendError}</div>}
            {isSendSuccess && <div>Данные успешно отправлены</div>}
          </div>
          <div className="playlist-section">
            <VideoPlaylist playlistId={selectedPlaylistId} />
          </div>
          
          <div className="player-section">
            {currentItem && (
              <VideoPlayer
                playlistItems={playlistItems}
                mediaFiles={mediaFiles}
                currentItemIndex={currentItemIndex}
                onItemEnd={handleItemEnd}
              />
            )}
            
            <div className="player-controls">
              <button onClick={playPrevious} disabled={playlistItems.length === 0}>
                ⏮
              </button>
              <button onClick={togglePlay} disabled={playlistItems.length === 0}>
                {isPlaying ? '⏸' : '▶️'}
              </button>
              <button onClick={playNext} disabled={playlistItems.length === 0}>
                ⏭
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

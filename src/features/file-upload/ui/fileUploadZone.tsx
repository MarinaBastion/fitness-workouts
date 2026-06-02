// features/file-upload/ui/FileUploadZone.tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MediaFile, MediaFileCategory } from '../../../entities/media-file/model/media-file';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addUploadedMediaFile } from '../model/fileUploadSlice';
import { selectUploadedMediaFiles } from '../model/fileUploadSelectors';

export const FileUploadZone: React.FC = () => {
  const dispatch = useAppDispatch();
  const uploadedMediaFiles = useAppSelector(selectUploadedMediaFiles);

  const makeLocalMediaFile = useCallback((file: File, description: string, category: MediaFileCategory[]): MediaFile => {
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

    const now = new Date().toISOString();

    return {
      id,
      name: file.name,
      originalName: file.name,
      filePath: URL.createObjectURL(file),
      duration: 0,
      size: file.size,
      mimeType: file.type || 'application/octet-stream',
      thumbnailUrl: undefined,
      shortVideoUrl: undefined,
      createdAt: now,
      updatedAt: now,
      description: description,
      categories: category
    };
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const mediaFile = makeLocalMediaFile(file,"",[]);
        console.log(`Файл ${file.name} сохранён локально`);
        dispatch(addUploadedMediaFile(mediaFile));
      }
    },
    [dispatch, makeLocalMediaFile]
  );

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
    },
    multiple: true,
  });
  const pendingFiles = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const savedFiles = uploadedMediaFiles.map((file) => (
    <li key={file.id}>
      {file.name} — {file.size} bytes
    </li>
  ));


  return (
    <div 
      {...getRootProps()} 
      className={`upload-zone ${isDragActive ? 'drag-active' : ''}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Отпустите файлы для загрузки...</p>
      ) : (
        <div>
          <p>Перетащите видео/аудио файлы сюда</p>
          <p>или нажмите для выбора файлов</p>
          <button type="button">Выбрать файлы</button>
        </div>
      )}
      {/* <aside>
        <h4>Принятые в dropzone</h4>
        <ul>{pendingFiles}</ul>
      </aside>
      <aside>
        <h4>Сохранённые медиафайлы</h4>
        <ul>{savedFiles}</ul>
      </aside> */}
    </div>
  );
};

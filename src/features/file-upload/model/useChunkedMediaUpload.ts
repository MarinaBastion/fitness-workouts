import { useCallback } from 'react';
import {
  useCompleteMediaUploadMutation,
  useInitMediaUploadMutation,
  useUploadMediaChunkMutation,
} from '@/entities/media-file/api/mediaUploadApi';
import {
  clearUploadSession,
  getUploadKey,
  loadUploadSession,
  saveUploadSession,
} from './uploadSessionStorage';

const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024;

const waitForOnline = () => {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (navigator.onLine) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const handleOnline = () => {
      window.removeEventListener('online', handleOnline);
      resolve();
    };
    window.addEventListener('online', handleOnline, { once: true });
  });
};

const resolveUploadId = (response: { uploadId?: string; id?: string }) => {
  return response.uploadId ?? response.id ?? '';
};

export const useChunkedMediaUpload = () => {
  const [initUpload] = useInitMediaUploadMutation();
  const [uploadChunk] = useUploadMediaChunkMutation();
  const [completeUpload] = useCompleteMediaUploadMutation();

  const uploadFile = useCallback(
    async (
      file: File,
      categoryId: string[],
      options?: {
        shortVideo?: File;
        thumbnail?: File;
      }
    ) => {
      const uploadKey = getUploadKey(file);
      const savedSession = loadUploadSession(uploadKey);

      let uploadId = savedSession?.uploadId ?? '';
      let chunkSize = savedSession?.chunkSize ?? DEFAULT_CHUNK_SIZE;
      let lastUploadedChunk = savedSession?.lastUploadedChunk ?? -1;
      const totalChunks = Math.ceil(file.size / chunkSize);
      if (!uploadId) {
        const initResponse = await initUpload({
          fileName: file.name,
          size: file.size,
          mimeType: file.type || 'application/octet-stream',
          totalChunks : totalChunks
        }).unwrap();

        uploadId = resolveUploadId(initResponse);
        if (!uploadId) {
          throw new Error('Upload id not returned from init endpoint.');
        }

        if (initResponse.chunkSize) {
          chunkSize = initResponse.chunkSize;
        }

        lastUploadedChunk = -1;
        saveUploadSession(uploadKey, {
          uploadId,
          chunkSize,
          lastUploadedChunk,
        });
      }

     

      for (let chunkIndex = lastUploadedChunk + 1; chunkIndex < totalChunks; chunkIndex += 1) {
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          await waitForOnline();
        }

        const start = chunkIndex * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        try {
          await uploadChunk({
            uploadId,
            chunkIndex,
            totalChunks,
            chunkSize,
            chunk,
            fileName: file.name,
          }).unwrap();
        } catch (error) {
          if (typeof navigator !== 'undefined' && !navigator.onLine) {
            await waitForOnline();
            chunkIndex -= 1;
            continue;
          }
          throw error;
        }

        saveUploadSession(uploadKey, {
          uploadId,
          chunkSize,
          lastUploadedChunk: chunkIndex,
        });
      }
      debugger;
      await completeUpload({
        uploadId,
        totalChunks,
        categoryId,
        shortVideo: options?.shortVideo,
        thumbnail: options?.thumbnail,
      }).unwrap();

      clearUploadSession(uploadKey);
    },
    [completeUpload, initUpload, uploadChunk]
  );

  return { uploadFile };
};

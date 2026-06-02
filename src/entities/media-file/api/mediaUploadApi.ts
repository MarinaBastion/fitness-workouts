import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MediaFile } from '../model/media-file';
import { normalizeSingleMediaFile } from './mappers';

export type InitMediaUploadRequest = {
  fileName: string;
  size: number;
  mimeType: string;
  totalChunks: number;
};

export type InitMediaUploadResponse = {
  uploadId?: string;
  id?: string;
  chunkSize?: number;
};

export type UploadMediaChunkRequest = {
  uploadId: string;
  chunkIndex: number;
  totalChunks: number;
  chunkSize: number;
  chunk: Blob;
  fileName: string;
};

export type CompleteMediaUploadRequest = {
  uploadId: string;
  totalChunks: number;
  categoryId: string[];
  name?: string;
  description?: string;
  shortVideo?: File | null;
  thumbnail?: File | null;
};

export const mediaUploadApi = createApi({
  reducerPath: 'mediaUploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7026/api/media',
  }),
  endpoints: (builder) => ({
    initMediaUpload: builder.mutation<InitMediaUploadResponse, InitMediaUploadRequest>({
      query: (body) => ({
        url: '/uploads/init',
        method: 'POST',
        body,
      }),
    }),
    uploadMediaChunk: builder.mutation<void, UploadMediaChunkRequest>({
      queryFn: async ({ uploadId, chunkIndex, totalChunks, chunkSize, chunk, fileName }, _api, _extraOptions, fetchWithBQ) => {
        const formData = new FormData();
        formData.append('chunk', chunk, fileName);
        formData.append('chunkIndex', String(chunkIndex));
        formData.append('totalChunks', String(totalChunks));
        formData.append('chunkSize', String(chunkSize));
        formData.append('fileName', fileName);

        const request = (method: 'POST' | 'PUT') => ({
          url: `/uploads/${uploadId}/chunk`,
          method,
          body: formData,
        });

        let result = await fetchWithBQ(request('POST'));

        if (result.error && 'status' in result.error && result.error.status === 405) {
          result = await fetchWithBQ(request('PUT'));
        }

        if (result.error) {
          return { error: result.error };
        }

        return { data: undefined };
      },
    }),
    completeMediaUpload: builder.mutation<MediaFile, CompleteMediaUploadRequest>({
      queryFn: async (
        { uploadId, totalChunks, categoryId, name, description, shortVideo, thumbnail },
        _api,
        _extraOptions,
        fetchWithBQ
      ) => {
        const formData = new FormData();
        formData.append('uploadId', uploadId);
        formData.append('totalChunks', String(totalChunks));
        categoryId.forEach((id) => formData.append('categoryId', id));

        if (name) {
          formData.append('name', name);
        }
        if (description) {
          formData.append('description', description);
        }
        if (shortVideo) {
          formData.append('shortVideo', shortVideo);
        }
        if (thumbnail) {
          formData.append('thumbnail', thumbnail);
        }

        const request = (method: 'POST' | 'PUT') => ({
          url: `/uploads/${uploadId}/complete`,
          method,
          body: formData,
        });

        let result = await fetchWithBQ(request('POST'));

        if (result.error && 'status' in result.error && result.error.status === 405) {
          result = await fetchWithBQ(request('PUT'));
        }

        if (result.error) {
          return { error: result.error };
        }

        const raw = result.data as MediaFile;
        return { data: normalizeSingleMediaFile(raw) };
      },
    }),
  }),
});

export const {
  useInitMediaUploadMutation,
  useUploadMediaChunkMutation,
  useCompleteMediaUploadMutation,
} = mediaUploadApi;

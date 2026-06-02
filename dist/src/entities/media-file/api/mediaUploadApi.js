var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const mediaUploadApi = createApi({
    reducerPath: 'mediaUploadApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7026/api/media',
    }),
    endpoints: (builder) => ({
        initMediaUpload: builder.mutation({
            query: (body) => ({
                url: '/uploads/init',
                method: 'POST',
                body,
            }),
        }),
        uploadMediaChunk: builder.mutation({
            queryFn: (_a, _api_1, _extraOptions_1, fetchWithBQ_1) => __awaiter(void 0, [_a, _api_1, _extraOptions_1, fetchWithBQ_1], void 0, function* ({ uploadId, chunkIndex, totalChunks, chunkSize, chunk, fileName }, _api, _extraOptions, fetchWithBQ) {
                const formData = new FormData();
                formData.append('chunk', chunk, fileName);
                formData.append('chunkIndex', String(chunkIndex));
                formData.append('totalChunks', String(totalChunks));
                formData.append('chunkSize', String(chunkSize));
                formData.append('fileName', fileName);
                const request = (method) => ({
                    url: `/uploads/${uploadId}/chunk`,
                    method,
                    body: formData,
                });
                let result = yield fetchWithBQ(request('POST'));
                if (result.error && 'status' in result.error && result.error.status === 405) {
                    result = yield fetchWithBQ(request('PUT'));
                }
                if (result.error) {
                    return { error: result.error };
                }
                return { data: undefined };
            }),
        }),
        completeMediaUpload: builder.mutation({
            queryFn: (_a, _api_1, _extraOptions_1, fetchWithBQ_1) => __awaiter(void 0, [_a, _api_1, _extraOptions_1, fetchWithBQ_1], void 0, function* ({ uploadId, totalChunks, categoryId }, _api, _extraOptions, fetchWithBQ) {
                const request = (method) => ({
                    url: `/uploads/${uploadId}/complete`,
                    method,
                    body: { uploadId, totalChunks, categoryId },
                });
                let result = yield fetchWithBQ(request('POST'));
                if (result.error && 'status' in result.error && result.error.status === 405) {
                    result = yield fetchWithBQ(request('PUT'));
                }
                if (result.error) {
                    return { error: result.error };
                }
                return { data: result.data };
            }),
        }),
    }),
});
export const { useInitMediaUploadMutation, useUploadMediaChunkMutation, useCompleteMediaUploadMutation, } = mediaUploadApi;

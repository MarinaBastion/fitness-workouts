import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { normalizeMediaFilesResponse } from './mappers';
import { GetMediaFilesParams, GetMediaFilesResponse } from './types';

export const mediaApi = createApi({
  reducerPath: 'mediaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7026/api/media-files',
    prepareHeaders: (headers) => {
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  tagTypes: ['MediaFile'],
  endpoints: (builder) => ({
    getMediaFiles: builder.query<GetMediaFilesResponse, GetMediaFilesParams | void>({
      query: (params) => {
        const queryParams = (params ?? {}) as GetMediaFilesParams;
        const searchParams = new URLSearchParams();

        if (queryParams.Search) {
          searchParams.set('Search', queryParams.Search);
        }

        const categoryIds = queryParams.CategoryIds;

        if (categoryIds?.length) {
          categoryIds.forEach((id: string) => {
            searchParams.append('CategoryIds', id);
          });
        }

        if (typeof queryParams.PageNumber === 'number') {
          searchParams.set('PageNumber', String(queryParams.PageNumber));
        }

        if (typeof queryParams.PageSize === 'number') {
          searchParams.set('PageSize', String(queryParams.PageSize));
        }

        const queryString = searchParams.toString();
        return queryString ? `?${queryString}` : '';
      },
      transformResponse: (response: GetMediaFilesResponse) => normalizeMediaFilesResponse(response),
      providesTags: ['MediaFile'],
    }),
  }),
});

export const { useGetMediaFilesQuery } = mediaApi;
export type { GetMediaFilesParams, GetMediaFilesResponse } from './types';
export { extractMediaFiles } from './mappers';

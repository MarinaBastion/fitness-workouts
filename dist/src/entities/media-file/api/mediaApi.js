import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { normalizeMediaFilesResponse } from './mappers';
export const mediaApi = createApi({
    reducerPath: 'mediaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7026/api/media-files',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['MediaFile'],
    endpoints: (builder) => ({
        getMediaFiles: builder.query({
            query: (params) => {
                const queryParams = (params !== null && params !== void 0 ? params : {});
                const searchParams = new URLSearchParams();
                if (queryParams.Search) {
                    searchParams.set('Search', queryParams.Search);
                }
                const categoryIds = queryParams.CategoryIds;
                if (categoryIds === null || categoryIds === void 0 ? void 0 : categoryIds.length) {
                    categoryIds.forEach((id) => {
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
            transformResponse: (response) => normalizeMediaFilesResponse(response),
            providesTags: ['MediaFile'],
        }),
    }),
});
export const { useGetMediaFilesQuery } = mediaApi;
export { extractMediaFiles } from './mappers';

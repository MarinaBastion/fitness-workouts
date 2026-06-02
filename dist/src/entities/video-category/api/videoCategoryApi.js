import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const videoCategoryApi = createApi({
    reducerPath: 'videoCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7026',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['VideoCategory'],
    endpoints: (builder) => ({
        getVideocategories: builder.query({
            query: () => '/Category',
            providesTags: ['VideoCategory'],
        }),
        createVideoCategory: builder.mutation({
            query: (body) => ({
                url: '/Category',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['VideoCategory'],
        }),
        updateVideoCategory: builder.mutation({
            query: (body) => ({
                url: '/Category',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['VideoCategory'],
        }),
    }),
});
export const { useCreateVideoCategoryMutation, useGetVideocategoriesQuery, useUpdateVideoCategoryMutation } = videoCategoryApi;

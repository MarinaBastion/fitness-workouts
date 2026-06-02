import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateVideoCategoryRequest, GetVideoCategoryRequest, ResponseWrapper, UpdateVideoCategoryRequest, VideoCategory } from '../model/type';



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
    getVideocategories: builder.query<ResponseWrapper<VideoCategory[]>, GetVideoCategoryRequest | void>({
          query: () => '/Category',
          providesTags: ['VideoCategory'],
        }),        
    createVideoCategory: builder.mutation<VideoCategory, CreateVideoCategoryRequest>({
      query: (body) => ({
        url: '/Category',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VideoCategory'],
    }),   
    updateVideoCategory: builder.mutation<VideoCategory, UpdateVideoCategoryRequest>({
      query: (body) => ({
        url: '/Category',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['VideoCategory'],
    }), 
  }),
});

export const { useCreateVideoCategoryMutation ,useGetVideocategoriesQuery, useUpdateVideoCategoryMutation} = videoCategoryApi;

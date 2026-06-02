import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const playlistApi = createApi({
    reducerPath: 'playlistApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/playlist',
    }),
    tagTypes: ['Playlist'],
    endpoints: (builder) => ({
        getPlaylists: builder.query({
            query: () => '',
            providesTags: ['Playlist'],
        }),
        getPlaylist: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Playlist', id }],
        }),
        createPlaylist: builder.mutation({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Playlist'],
        }),
        addFileToPlaylist: builder.mutation({
            query: ({ playlistId, mediaFileId }) => ({
                url: `/${playlistId}/items`,
                method: 'POST',
                body: { mediaFileId },
            }),
            invalidatesTags: (result, error, { playlistId }) => [
                { type: 'Playlist', id: playlistId }
            ],
        }),
        updatePlaylistItems: builder.mutation({
            query: ({ playlistId, items }) => ({
                url: `/${playlistId}/items`,
                method: 'PUT',
                body: { items },
            }),
            invalidatesTags: ['Playlist'],
        }),
    }),
});
export const { useGetPlaylistsQuery, useGetPlaylistQuery, useAddFileToPlaylistMutation, useCreatePlaylistMutation, useUpdatePlaylistItemsMutation, } = playlistApi;

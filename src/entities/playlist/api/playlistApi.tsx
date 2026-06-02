import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Playlist, PlaylistItem } from '../model/playlist';

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/playlist',
  }),
  tagTypes: ['Playlist'],
  endpoints: (builder) => ({
    getPlaylists: builder.query<Playlist[], void>({
      query: () => '',
      providesTags: ['Playlist'],
    }),
    getPlaylist: builder.query<Playlist, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Playlist', id }],
    }),
    createPlaylist: builder.mutation<Playlist, { name: string }>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Playlist'],
    }),
    addFileToPlaylist: builder.mutation<PlaylistItem, {
      playlistId: string;
      mediaFileId: string;
    }>({
      query: ({ playlistId, mediaFileId }) => ({
        url: `/${playlistId}/items`,
        method: 'POST',
        body: { mediaFileId },
      }),
      invalidatesTags: (result, error, { playlistId }) => [
        { type: 'Playlist', id: playlistId }
      ],
    }),
    updatePlaylistItems: builder.mutation<Playlist, { 
      playlistId: string; 
      items: Omit<PlaylistItem, 'id'>[] 
    }>({
      query: ({ playlistId, items }) => ({
        url: `/${playlistId}/items`,
        method: 'PUT',
        body: { items },
      }),
      invalidatesTags: ['Playlist'],
    }),
  }),
});

export const {
  useGetPlaylistsQuery,
  useGetPlaylistQuery,
  useAddFileToPlaylistMutation,
  useCreatePlaylistMutation,
  useUpdatePlaylistItemsMutation,
} = playlistApi;
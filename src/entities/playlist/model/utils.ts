import { useGetPlaylistQuery } from '../api/playlistApi';
import { Playlist, PlaylistItem } from './playlist';

export const getPlaylistItemById = (playlistItems: PlaylistItem[],itemId: string) => {
  return playlistItems.find(item => item.id === itemId);
};
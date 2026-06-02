export interface VideoPlaylistState {
  currentPlaylistId: string | null;
  currentItemIndex: number;
  isPlaying: boolean;
  isPaused: boolean;
}

export interface PlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
}
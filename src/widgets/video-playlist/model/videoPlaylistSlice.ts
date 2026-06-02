import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoPlaylistState {
  currentPlaylistId: string | null;
  currentItemIndex: number;
  isPlaying: boolean;
  isPaused: boolean;
}

const initialState: VideoPlaylistState = {
  currentPlaylistId: null,
  currentItemIndex: -1,
  isPlaying: false,
  isPaused: false,
};

export const videoPlaylistSlice = createSlice({
  name: 'videoPlaylist',
  initialState,
  reducers: {
    setCurrentPlaylist: (state, action: PayloadAction<string | null>) => {
      state.currentPlaylistId = action.payload;
      state.currentItemIndex = -1;
      state.isPlaying = false;
      state.isPaused = false;
    },
    setCurrentItemIndex: (state, action: PayloadAction<number>) => {
      state.currentItemIndex = action.payload;
    },
    play: (state) => {
      state.isPlaying = true;
      state.isPaused = false;
    },
    pause: (state) => {
      state.isPaused = true;
    },
    playNext: (state, action: PayloadAction<number>) => {
      const nextIndex = action.payload;
      state.currentItemIndex = nextIndex;
      state.isPlaying = true;
      state.isPaused = false;
    },
    playPrevious: (state, action: PayloadAction<number>) => {
      const prevIndex = action.payload;
      state.currentItemIndex = prevIndex;
      state.isPlaying = true;
      state.isPaused = false;
    },
  },
});

export const { 
  setCurrentPlaylist, 
  setCurrentItemIndex, 
  play, 
  pause, 
  playNext, 
  playPrevious 
} = videoPlaylistSlice.actions;

export default videoPlaylistSlice.reducer;
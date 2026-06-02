import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentPlaylistId: null,
    currentItemIndex: -1,
    isPlaying: false,
    isPaused: false,
};
export const videoPlaylistSlice = createSlice({
    name: 'videoPlaylist',
    initialState,
    reducers: {
        setCurrentPlaylist: (state, action) => {
            state.currentPlaylistId = action.payload;
            state.currentItemIndex = -1;
            state.isPlaying = false;
            state.isPaused = false;
        },
        setCurrentItemIndex: (state, action) => {
            state.currentItemIndex = action.payload;
        },
        play: (state) => {
            state.isPlaying = true;
            state.isPaused = false;
        },
        pause: (state) => {
            state.isPaused = true;
        },
        playNext: (state, action) => {
            const nextIndex = action.payload;
            state.currentItemIndex = nextIndex;
            state.isPlaying = true;
            state.isPaused = false;
        },
        playPrevious: (state, action) => {
            const prevIndex = action.payload;
            state.currentItemIndex = prevIndex;
            state.isPlaying = true;
            state.isPaused = false;
        },
    },
});
export const { setCurrentPlaylist, setCurrentItemIndex, play, pause, playNext, playPrevious } = videoPlaylistSlice.actions;
export default videoPlaylistSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { mediaApi } from '../entities/media-file/api/mediaApi';
import { playlistApi } from '../entities/playlist/api/playlistApi';
import { mediaUploadApi } from '../entities/media-file/api/mediaUploadApi';
import { videoCategoryApi } from '../entities/video-category/api/videoCategoryApi';
import { mediaLibrarySlice } from '../widgets/media-library/model/mediaLibrarySlice';
import { videoPlaylistSlice } from '../widgets/video-playlist/model/videoPlaylistSlice';
import { fileUploadSlice } from '../features/file-upload/model/fileUploadSlice';
import { videoCategorySlice } from '../features/category/model/videoCategotySlice';
export const store = configureStore({
    reducer: {
        [mediaApi.reducerPath]: mediaApi.reducer,
        [playlistApi.reducerPath]: playlistApi.reducer,
        [mediaUploadApi.reducerPath]: mediaUploadApi.reducer,
        [videoCategoryApi.reducerPath]: videoCategoryApi.reducer,
        mediaLibrary: mediaLibrarySlice.reducer,
        videoPlaylist: videoPlaylistSlice.reducer,
        fileUpload: fileUploadSlice.reducer,
        videoCategory: videoCategorySlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(mediaApi.middleware)
        .concat(playlistApi.middleware)
        .concat(mediaUploadApi.middleware)
        .concat(videoCategoryApi.middleware),
});

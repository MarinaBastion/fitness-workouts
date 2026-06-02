import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    uploadedMediaFiles: [],
};
export const fileUploadSlice = createSlice({
    name: 'fileUpload',
    initialState,
    reducers: {
        setUploadedMediaFiles(state, action) {
            state.uploadedMediaFiles = action.payload;
        },
        addUploadedMediaFile(state, action) {
            const exists = state.uploadedMediaFiles.some((file) => file.id === action.payload.id);
            if (!exists) {
                state.uploadedMediaFiles.push(action.payload);
            }
        },
        updateUploadedMediaFile(state, action) {
            const index = state.uploadedMediaFiles.findIndex((file) => file.id === action.payload.id);
            if (index !== -1) {
                state.uploadedMediaFiles[index] = action.payload;
            }
        },
        clearUploadedMediaFiles(state) {
            state.uploadedMediaFiles = [];
        },
    },
});
export const { setUploadedMediaFiles, addUploadedMediaFile, clearUploadedMediaFiles, updateUploadedMediaFile } = fileUploadSlice.actions;

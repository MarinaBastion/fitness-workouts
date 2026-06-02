import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    uploadedCategories: [],
};
export const videoCategorySlice = createSlice({
    name: 'videoCategoryUpload',
    initialState,
    reducers: {
        setUploadedVideoCategories(state, action) {
            state.uploadedCategories = action.payload;
        },
        addUploadedVideoCategory(state, action) {
            const exists = state.uploadedCategories.some((file) => file.id === action.payload.id);
            if (!exists) {
                state.uploadedCategories.push(action.payload);
            }
        },
        updateUploadedVideoCategory(state, action) {
            const index = state.uploadedCategories.findIndex((file) => file.id === action.payload.id);
            if (index !== -1) {
                state.uploadedCategories[index] = action.payload;
            }
        },
        clearUploadedVideoCategories(state) {
            state.uploadedCategories = [];
        },
    },
});
export const { setUploadedVideoCategories, addUploadedVideoCategory, updateUploadedVideoCategory, clearUploadedVideoCategories, } = videoCategorySlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {VideoCategory} from "@/entities/video-category/index"

export interface VideCategoryState {
  uploadedCategories: VideoCategory[];
}

const initialState: VideCategoryState = {
  uploadedCategories: [],
};

export const videoCategorySlice = createSlice({
  name: 'videoCategoryUpload',
  initialState,
  reducers: {
    setUploadedVideoCategories(state, action: PayloadAction<VideoCategory[]>) {
      state.uploadedCategories = action.payload;
    },
    addUploadedVideoCategory(state, action: PayloadAction<VideoCategory>) {
      const exists = state.uploadedCategories.some((file) => file.id === action.payload.id);
      if (!exists) {
        state.uploadedCategories.push(action.payload);
      }
    },
    updateUploadedVideoCategory(state, action: PayloadAction<VideoCategory>) {
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

export const {
  setUploadedVideoCategories,
  addUploadedVideoCategory,
  updateUploadedVideoCategory,
  clearUploadedVideoCategories,
} = videoCategorySlice.actions;

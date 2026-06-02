import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MediaFile } from '../../../entities/media-file/model/media-file';

export interface FileUploadState {
  uploadedMediaFiles: MediaFile[];
}

const initialState: FileUploadState = {
  uploadedMediaFiles: [],
};

export const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    setUploadedMediaFiles(state, action: PayloadAction<MediaFile[]>) {
      state.uploadedMediaFiles = action.payload;
    },
    addUploadedMediaFile(state, action: PayloadAction<MediaFile>) {
      const exists = state.uploadedMediaFiles.some((file) => file.id === action.payload.id);
      if (!exists) {
        state.uploadedMediaFiles.push(action.payload);
      }
    },
    updateUploadedMediaFile(state, action: PayloadAction<MediaFile>) {
      const index = state.uploadedMediaFiles.findIndex(
        (file) => file.id === action.payload.id
      );
      if (index !== -1) {
        state.uploadedMediaFiles[index] = action.payload;
      }
    },
    clearUploadedMediaFiles(state) {
      state.uploadedMediaFiles = [];
    },
  },
});

export const {
  setUploadedMediaFiles,
  addUploadedMediaFile,
  clearUploadedMediaFiles,
  updateUploadedMediaFile
} = fileUploadSlice.actions;


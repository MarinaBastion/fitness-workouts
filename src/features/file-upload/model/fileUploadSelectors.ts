import { RootState } from '../../../app/store';

export const selectUploadedMediaFiles = (state: RootState) => state.fileUpload.uploadedMediaFiles;


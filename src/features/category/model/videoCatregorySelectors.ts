import { RootState } from '../../../app/store';

export const selectVideoCategories = (state: RootState) => state.videoCategory.uploadedCategories;


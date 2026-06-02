import { RootState } from '../../../app/store';

export const selectMediaLibraryFilters = (state: RootState) => state.mediaLibrary.filters;
export const selectMediaLibrarySortBy = (state: RootState) => state.mediaLibrary.sortBy;
export const selectSelectedFiles = (state: RootState) => state.mediaLibrary.selectedFiles;
export const selectViewMode = (state: RootState) => state.mediaLibrary.viewMode;
export const selectIsUploadDialogOpen = (state: RootState) => state.mediaLibrary.isUploadDialogOpen;
export const selectSidebarCollapsed = (state: RootState) => state.mediaLibrary.sidebarCollapsed;
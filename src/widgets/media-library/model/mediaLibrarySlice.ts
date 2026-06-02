import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MediaLibraryFilters {
  type: 'all' | 'video' | 'audio';
  searchQuery: string;
  minDuration?: number;
  maxDuration?: number;
}

export type MediaLibrarySortBy = 'name' | 'date' | 'size' | 'duration';
export type MediaLibraryViewMode = 'grid' | 'list';

export interface MediaLibraryState {
  filters: MediaLibraryFilters;
  sortBy: MediaLibrarySortBy;
  selectedFiles: string[];
  viewMode: MediaLibraryViewMode;
  isUploadDialogOpen: boolean;
  sidebarCollapsed: boolean;
}

const initialState: MediaLibraryState = {
  filters: {
    type: 'all',
    searchQuery: '',
    minDuration: undefined,
    maxDuration: undefined,
  },
  sortBy: 'name',
  selectedFiles: [],
  viewMode: 'grid',
  isUploadDialogOpen: false,
  sidebarCollapsed: false,
};

export const mediaLibrarySlice = createSlice({
  name: 'mediaLibrary',
  initialState,
  reducers: {
    // Фильтры
    setFilterType: (state, action: PayloadAction<'all' | 'video' | 'audio'>) => {
      state.filters.type = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    setDurationRange: (state, action: PayloadAction<{ min?: number; max?: number }>) => {
      state.filters.minDuration = action.payload.min;
      state.filters.maxDuration = action.payload.max;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Сортировка
    setSortBy: (state, action: PayloadAction<MediaLibrarySortBy>) => {
      state.sortBy = action.payload;
    },

    // Выбранные файлы
    toggleFileSelection: (state, action: PayloadAction<string>) => {
      const fileId = action.payload;
      const index = state.selectedFiles.indexOf(fileId);
      if (index > -1) {
        state.selectedFiles.splice(index, 1);
      } else {
        state.selectedFiles.push(fileId);
      }
    },
    selectAllFiles: (state, action: PayloadAction<string[]>) => {
      state.selectedFiles = action.payload;
    },
    clearSelection: (state) => {
      state.selectedFiles = [];
    },

    // Режим отображения
    setViewMode: (state, action: PayloadAction<MediaLibraryViewMode>) => {
      state.viewMode = action.payload;
    },

    // Диалог загрузки
    openUploadDialog: (state) => {
      state.isUploadDialogOpen = true;
    },
    closeUploadDialog: (state) => {
      state.isUploadDialogOpen = false;
    },

    // Боковая панель
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const {
  setFilterType,
  setSearchQuery,
  setDurationRange,
  resetFilters,
  setSortBy,
  toggleFileSelection,
  selectAllFiles,
  clearSelection,
  setViewMode,
  openUploadDialog,
  closeUploadDialog,
  toggleSidebar,
  setSidebarCollapsed,
} = mediaLibrarySlice.actions;

export default mediaLibrarySlice.reducer;
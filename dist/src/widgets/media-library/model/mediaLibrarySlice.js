import { createSlice } from '@reduxjs/toolkit';
const initialState = {
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
        setFilterType: (state, action) => {
            state.filters.type = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.filters.searchQuery = action.payload;
        },
        setDurationRange: (state, action) => {
            state.filters.minDuration = action.payload.min;
            state.filters.maxDuration = action.payload.max;
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
        // Сортировка
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        // Выбранные файлы
        toggleFileSelection: (state, action) => {
            const fileId = action.payload;
            const index = state.selectedFiles.indexOf(fileId);
            if (index > -1) {
                state.selectedFiles.splice(index, 1);
            }
            else {
                state.selectedFiles.push(fileId);
            }
        },
        selectAllFiles: (state, action) => {
            state.selectedFiles = action.payload;
        },
        clearSelection: (state) => {
            state.selectedFiles = [];
        },
        // Режим отображения
        setViewMode: (state, action) => {
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
        setSidebarCollapsed: (state, action) => {
            state.sidebarCollapsed = action.payload;
        },
    },
});
export const { setFilterType, setSearchQuery, setDurationRange, resetFilters, setSortBy, toggleFileSelection, selectAllFiles, clearSelection, setViewMode, openUploadDialog, closeUploadDialog, toggleSidebar, setSidebarCollapsed, } = mediaLibrarySlice.actions;
export default mediaLibrarySlice.reducer;

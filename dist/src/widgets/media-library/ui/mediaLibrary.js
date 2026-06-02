import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { extractMediaFiles, useGetMediaFilesQuery } from '../../../entities/media-file/api/mediaApi';
import { FileUploadZone } from '../../../features/file-upload/ui/fileUploadZone';
import { useMediaLibraryDragDrop } from '../../../features/media-drag-drop/model/useMediaLibraryDragDrop';
export const MediaLibrary = () => {
    const { data: mediaFilesResponse, isLoading } = useGetMediaFilesQuery();
    const mediaFiles = extractMediaFiles(mediaFilesResponse);
    const { activeFile, handleDragStart, handleDragEnd, handleDragOver, } = useMediaLibraryDragDrop();
    if (isLoading)
        return _jsx("div", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043C\u0435\u0434\u0438\u0430\u0442\u0435\u043A\u0438..." });
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u041C\u0435\u0434\u0438\u0430\u0442\u0435\u043A\u0430" }), _jsx(FileUploadZone, {})] }));
};

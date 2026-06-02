var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { MediaLibrary } from '../../../widgets/media-library/ui/mediaLibrary';
import { VideoPlaylist } from '../../../widgets/video-playlist/ui/videoPlaylist';
import { VideoPlayer } from '../../../widgets/video-player/ui/VideoPlayer';
import { useVideoPlaylist } from '../../../widgets/video-playlist';
import { extractMediaFiles, useGetMediaFilesQuery } from '../../../entities/media-file/api/mediaApi';
import { UploadedMediaCarousel } from '../../../widgets/uploaded-media-carousel';
import { VideoCatrgoriesListForm } from '../../../features/category/ui/VideoCatrgoriesListForm';
import { useAppSelector } from '../../../app/hooks';
import { selectUploadedMediaFiles } from '../../../features/file-upload/model/fileUploadSelectors';
import { useChunkedMediaUpload } from '../../../features/file-upload/model/useChunkedMediaUpload';
import Style from './mediaLibraryPage.module.css';
export const MediaLibraryPage = () => {
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState(null);
    const [isSendSuccess, setIsSendSuccess] = useState(false);
    const uploadedMediaFiles = useAppSelector(selectUploadedMediaFiles);
    const { uploadFile } = useChunkedMediaUpload();
    // Получаем медиафайлы для передачи в VideoPlayer
    const { data: mediaFilesResponse, refetch: refetchMediaFiles } = useGetMediaFilesQuery();
    const mediaFiles = extractMediaFiles(mediaFilesResponse);
    const { playlistItems, currentItemIndex, currentItem, isPlaying, playNext, playPrevious, togglePlay, handleItemEnd, isLoading, } = useVideoPlaylist({ playlistId: selectedPlaylistId });
    debugger;
    console.log(Style);
    const handleSendToServer = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (uploadedMediaFiles.length === 0 || isSending) {
            return;
        }
        setIsSending(true);
        setSendError(null);
        setIsSendSuccess(false);
        try {
            for (const mediaFile of uploadedMediaFiles) {
                const response = yield fetch(mediaFile.filePath);
                if (!response.ok) {
                    throw new Error(`Не удалось прочитать файл ${mediaFile.name}`);
                }
                const blob = yield response.blob();
                const file = new File([blob], mediaFile.originalName || mediaFile.name, {
                    type: mediaFile.mimeType || blob.type || 'application/octet-stream',
                });
                const categoryIds = ((_a = mediaFile.categories) !== null && _a !== void 0 ? _a : [])
                    .map((category) => category.id)
                    .filter((value, index, arr) => value.length > 0 && arr.indexOf(value) === index);
                yield uploadFile(file, categoryIds);
            }
            setIsSendSuccess(true);
            refetchMediaFiles();
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Не удалось отправить данные';
            setSendError(errorMessage);
        }
        finally {
            setIsSending(false);
        }
    }), [uploadedMediaFiles, isSending, refetchMediaFiles, uploadFile]);
    if (isLoading) {
        return _jsx("div", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    }
    return (_jsxs("div", { className: Style.mediaLibraryPage, children: [_jsx(MediaLibrary, {}), _jsxs("div", { className: "main-content", children: [_jsx(VideoCatrgoriesListForm, {}), _jsx(UploadedMediaCarousel, {}), _jsxs("div", { className: "upload-actions", children: [_jsx("button", { type: "button", onClick: handleSendToServer, disabled: isSending || uploadedMediaFiles.length === 0, children: isSending ? 'Отправка...' : 'Отправить на сервер' }), sendError && _jsx("div", { children: sendError }), isSendSuccess && _jsx("div", { children: "\u0414\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B" })] }), _jsx("div", { className: "playlist-section", children: _jsx(VideoPlaylist, { playlistId: selectedPlaylistId }) }), _jsxs("div", { className: "player-section", children: [currentItem && (_jsx(VideoPlayer, { playlistItems: playlistItems, mediaFiles: mediaFiles, currentItemIndex: currentItemIndex, onItemEnd: handleItemEnd })), _jsxs("div", { className: "player-controls", children: [_jsx("button", { onClick: playPrevious, disabled: playlistItems.length === 0, children: "\u23EE" }), _jsx("button", { onClick: togglePlay, disabled: playlistItems.length === 0, children: isPlaying ? '⏸' : '▶️' }), _jsx("button", { onClick: playNext, disabled: playlistItems.length === 0, children: "\u23ED" })] })] })] })] }));
};

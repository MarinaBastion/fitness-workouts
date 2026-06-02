var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from 'react';
import { getMediaFileById } from '@/entities/media-file/model/utils';
import { extractMediaFiles, useGetMediaFilesQuery } from '../../../entities/media-file/api/mediaApi';
import { useAddFileToPlaylistMutation } from '@/entities/playlist/api/playlistApi';
export const useMediaLibraryDragDrop = () => {
    const [activeFile, setActiveFile] = useState(null);
    const { data: mediaFilesResponse } = useGetMediaFilesQuery();
    const mediafiles = extractMediaFiles(mediaFilesResponse);
    const [addFileToPlaylist] = useAddFileToPlaylistMutation();
    const handleDragStart = (event) => {
        const { active } = event;
        const fileId = active.id;
        // Находим файл по ID (из контекста или store)
        const file = getMediaFileById(mediafiles, fileId);
        setActiveFile(file);
    };
    const handleDragOver = (event) => {
        const { over } = event;
        if (!over)
            return;
        // Подсвечиваем drop-зону
        const overElement = over.data.current;
        if ((overElement === null || overElement === void 0 ? void 0 : overElement.type) === 'playlist') {
            // Можно добавить визуальный фидбек
        }
    };
    const handleDragEnd = (event) => __awaiter(void 0, void 0, void 0, function* () {
        const { active, over } = event;
        if (!over)
            return;
        const fileId = active.id;
        const overData = over.data.current;
        // Если перетащили в плейлист
        if ((overData === null || overData === void 0 ? void 0 : overData.type) === 'playlist') {
            const playlistId = overData.playlistId;
            try {
                yield addFileToPlaylist({
                    playlistId,
                    mediaFileId: fileId
                }).unwrap();
                console.log('Файл добавлен в плейлист');
            }
            catch (error) {
                console.error('Ошибка добавления в плейлист:', error);
            }
        }
    });
    return {
        activeFile,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    };
};

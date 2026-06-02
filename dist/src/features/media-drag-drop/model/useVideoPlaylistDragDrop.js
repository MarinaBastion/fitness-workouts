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
import { useGetPlaylistQuery, useUpdatePlaylistItemsMutation } from '../../../entities/playlist/api/playlistApi';
import { getPlaylistItemById } from '@/entities/playlist/model/utils';
export const useVideoPlaylistDragDrop = (playlistId) => {
    const [activeItem, setActiveItem] = useState(null);
    const [updatePlaylistItems] = useUpdatePlaylistItemsMutation();
    const { data: playlist } = useGetPlaylistQuery(playlistId);
    const playlistItems = (playlist === null || playlist === void 0 ? void 0 : playlist.items) || [];
    const handleDragStart = (event) => {
        const { active } = event;
        const itemId = active.id;
        const item = getPlaylistItemById(playlistItems, itemId);
        setActiveItem(item);
    };
    const handleDragEnd = (event) => __awaiter(void 0, void 0, void 0, function* () {
        const { active, over } = event;
        setActiveItem(null);
        if (!over)
            return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId)
            return;
        // Находим индексы элементов
        const oldIndex = playlistItems.findIndex(item => item.id === activeId);
        const newIndex = playlistItems.findIndex(item => item.id === overId);
        if (oldIndex === -1 || newIndex === -1)
            return;
        // Создаем новый порядок
        const newItems = [...playlistItems];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);
        // Обновляем порядок в items
        const updatedItems = newItems.map((item, index) => (Object.assign(Object.assign({}, item), { order: index + 1 })));
        // Сохраняем в БД
        try {
            yield updatePlaylistItems({
                playlistId,
                items: updatedItems
            }).unwrap();
        }
        catch (error) {
            console.error('Ошибка обновления плейлиста:', error);
        }
    });
    return {
        playlistItems,
        activeItem,
        handleDragStart,
        handleDragOver: () => { },
        handleDragEnd,
    };
};

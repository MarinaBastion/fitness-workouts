import { useState, useEffect, useCallback } from 'react';
import { useGetPlaylistQuery } from '../../../entities/playlist/api/playlistApi';
export const useVideoPlaylist = ({ playlistId }) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    // Получаем данные плейлиста
    const { data: playlist, isLoading: playlistLoading, error: playlistError } = useGetPlaylistQuery(playlistId, {
        skip: !playlistId,
    });
    const playlistItems = (playlist === null || playlist === void 0 ? void 0 : playlist.items) || [];
    const isLoading = playlistLoading;
    const error = playlistError;
    // Автоматически выбираем первый элемент при загрузке плейлиста
    useEffect(() => {
        if (playlistItems.length > 0 && currentItemIndex === -1) {
            setCurrentItemIndex(0);
        }
    }, [playlistItems, currentItemIndex]);
    // Сбрасываем индекс, если плейлист стал пустым
    useEffect(() => {
        if (playlistItems.length === 0) {
            setCurrentItemIndex(-1);
            setIsPlaying(false);
            setIsPaused(false);
        }
    }, [playlistItems.length]);
    const currentItem = currentItemIndex >= 0 && currentItemIndex < playlistItems.length
        ? playlistItems[currentItemIndex]
        : null;
    const currentMediaFileId = (currentItem === null || currentItem === void 0 ? void 0 : currentItem.mediaFileId) || null;
    const playNext = useCallback(() => {
        if (playlistItems.length === 0)
            return;
        const nextIndex = currentItemIndex < playlistItems.length - 1
            ? currentItemIndex + 1
            : 0; // Зацикливаем на начало
        setCurrentItemIndex(nextIndex);
        setIsPlaying(true);
        setIsPaused(false);
    }, [currentItemIndex, playlistItems.length]);
    const playPrevious = useCallback(() => {
        if (playlistItems.length === 0)
            return;
        const prevIndex = currentItemIndex > 0
            ? currentItemIndex - 1
            : playlistItems.length - 1; // Переходим к последнему
        setCurrentItemIndex(prevIndex);
        setIsPlaying(true);
        setIsPaused(false);
    }, [currentItemIndex, playlistItems.length]);
    const playItem = useCallback((index) => {
        if (index >= 0 && index < playlistItems.length) {
            setCurrentItemIndex(index);
            setIsPlaying(true);
            setIsPaused(false);
        }
    }, [playlistItems.length]);
    const togglePlay = useCallback(() => {
        if (playlistItems.length === 0)
            return;
        if (isPlaying && !isPaused) {
            setIsPaused(true);
        }
        else {
            setIsPlaying(true);
            setIsPaused(false);
        }
    }, [isPlaying, isPaused, playlistItems.length]);
    const pause = useCallback(() => {
        setIsPaused(true);
    }, []);
    const resume = useCallback(() => {
        setIsPlaying(true);
        setIsPaused(false);
    }, []);
    // ✅ Обработчик окончания элемента плейлиста
    const handleItemEnd = useCallback(() => {
        playNext();
    }, [playNext]);
    return {
        playlistItems,
        currentItemIndex,
        currentItem,
        currentMediaFileId,
        isPlaying,
        isPaused,
        playNext,
        playPrevious,
        playItem,
        togglePlay,
        pause,
        resume,
        handleItemEnd, // ✅ Добавлено в возвращаемый объект
        isLoading,
        error,
    };
};

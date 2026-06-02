import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// widgets/video-player/ui/VideoPlayer.tsx
import { useRef, useEffect, useState } from 'react';
export const VideoPlayer = ({ playlistItems, mediaFiles, // ✅ Получаем массив медиафайлов
currentItemIndex, onItemEnd, }) => {
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const currentItem = playlistItems[currentItemIndex];
    useEffect(() => {
        if (!currentItem || !videoRef.current)
            return;
        // ✅ Находим MediaFile по mediaFileId
        const mediaFile = mediaFiles.find(file => file.id === currentItem.mediaFileId);
        if (!mediaFile) {
            console.error('MediaFile not found for item:', currentItem.id);
            return;
        }
        const video = videoRef.current;
        // ✅ Используем filePath из найденного MediaFile
        video.src = mediaFile.filePath;
        // Устанавливаем время начала и окончания
        if (currentItem.startTime) {
            video.currentTime = currentItem.startTime;
        }
        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            // Проверяем, достигли ли времени окончания
            if (currentItem.endTime && video.currentTime >= currentItem.endTime) {
                onItemEnd();
            }
        };
        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };
        const handleEnded = () => {
            onItemEnd();
        };
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        };
    }, [currentItem, mediaFiles, onItemEnd]); // ✅ Добавляем mediaFiles в зависимости
    if (!currentItem) {
        return _jsx("div", { children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0438\u0434\u0435\u043E \u0434\u043B\u044F \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F" });
    }
    // ✅ Находим MediaFile для отображения информации
    const mediaFile = mediaFiles.find(file => file.id === currentItem.mediaFileId);
    if (!mediaFile) {
        return _jsx("div", { children: "\u041C\u0435\u0434\u0438\u0430\u0444\u0430\u0439\u043B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" });
    }
    return (_jsxs("div", { className: "video-player", children: [_jsx("video", { ref: videoRef, controls: true, style: { width: '100%', maxHeight: '500px' } }), _jsxs("div", { className: "video-info", children: [_jsx("h4", { children: mediaFile.name }), _jsxs("p", { children: [Math.floor(currentTime / 60), ":", (currentTime % 60).toFixed(0).padStart(2, '0'), " /", Math.floor(duration / 60), ":", (duration % 60).toFixed(0).padStart(2, '0')] })] })] }));
};

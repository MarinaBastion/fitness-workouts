import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Text, Button } from '@fluentui/react-components';
import styles from './playlistItemCard.module.css'; // ✅ Импорт стилей
export const PlaylistItemCard = ({ item, mediaFile, isDragging = false, onRemove, onEdit, }) => {
    var _a;
    const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging, } = useSortable({
        id: item.id,
        data: { type: 'playlist-item', item },
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging || isSortableDragging ? 0.5 : 1,
    };
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    const formatTimeRange = () => {
        if (item.startTime !== undefined && item.endTime !== undefined) {
            return `${formatDuration(item.startTime)} - ${formatDuration(item.endTime)}`;
        }
        if (item.startTime !== undefined) {
            return `С ${formatDuration(item.startTime)}`;
        }
        if (item.endTime !== undefined) {
            return `До ${formatDuration(item.endTime)}`;
        }
        return 'Полное видео';
    };
    const fileName = (mediaFile === null || mediaFile === void 0 ? void 0 : mediaFile.name) || 'Загрузка...';
    const thumbnailUrl = mediaFile === null || mediaFile === void 0 ? void 0 : mediaFile.thumbnailUrl;
    const fileDuration = (mediaFile === null || mediaFile === void 0 ? void 0 : mediaFile.duration) || 0;
    return (_jsx("div", Object.assign({ ref: setNodeRef, style: style }, attributes, listeners, { children: _jsx(Card, { className: `${styles.playlistItemCard} ${isDragging ? styles.dragging : ''}`, children: _jsxs("div", { className: styles.content, children: [_jsxs("div", { className: styles.thumbnail, children: [thumbnailUrl ? (_jsx("img", { src: thumbnailUrl, alt: fileName, className: styles.thumbnailImage })) : (_jsx("div", { className: styles.thumbnailPlaceholder, children: ((_a = mediaFile === null || mediaFile === void 0 ? void 0 : mediaFile.mimeType) === null || _a === void 0 ? void 0 : _a.startsWith('video/')) ? '🎬' : '🎵' })), _jsx("div", { className: styles.orderBadge, children: item.order })] }), _jsxs("div", { className: styles.info, children: [_jsx(Text, { className: styles.fileName, weight: "semibold", children: fileName }), _jsx(Text, { className: styles.timeRange, size: 200, children: formatTimeRange() }), fileDuration > 0 && (_jsxs(Text, { className: styles.duration, size: 200, children: ["\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C: ", formatDuration(fileDuration)] }))] }), _jsxs("div", { className: styles.actions, children: [onEdit && (_jsx(Button, { appearance: "subtle", size: "small", onClick: (e) => {
                                    e.stopPropagation();
                                    onEdit(item);
                                }, title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C", children: "\u270F\uFE0F" })), onRemove && (_jsx(Button, { appearance: "subtle", size: "small", onClick: (e) => {
                                    e.stopPropagation();
                                    onRemove(item.id);
                                }, title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", children: "\uD83D\uDDD1\uFE0F" }))] })] }) }) })));
};

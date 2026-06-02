import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Text } from '@fluentui/react-components';
import styles from './mediaCardFile.module.css';
export const MediaFileCard = ({ file, isDragging = false, onSelect }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({
        id: file.id,
        data: { type: 'media-file', file }
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
    const formatFileSize = (bytes) => {
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(1)} MB`;
    };
    return (_jsx("div", Object.assign({ ref: setNodeRef, style: style }, attributes, listeners, { children: _jsxs(Card, { className: styles.mediaFileCard, onClick: () => onSelect === null || onSelect === void 0 ? void 0 : onSelect(file), children: [_jsxs("div", { className: styles.thumbnail, children: [file.thumbnailUrl ? (_jsx("img", { src: file.thumbnailUrl, alt: file.name, className: styles.thumbnailImage })) : (_jsx("div", { className: styles.thumbnailIcon, children: file.mimeType.startsWith('video/') ? '🎬' : '🎵' })), _jsx("div", { className: styles.durationBadge, children: formatDuration(file.duration) })] }), _jsxs("div", { className: styles.fileInfo, children: [_jsx(Text, { className: styles.fileName, children: file.name }), _jsx(Text, { className: styles.fileSize, children: formatFileSize(file.size) }), _jsx(Text, { className: styles.fileType, children: file.mimeType.split('/')[1] })] })] }) })));
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DndContext, DragOverlay, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { PlaylistItemCard } from '../../../entities/playlist/ui/playlistItemCard';
import { useVideoPlaylistDragDrop } from '../../../features/media-drag-drop/model/useVideoPlaylistDragDrop';
export const VideoPlaylist = ({ playlistId }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: 'playlist-dropzone',
        data: { type: 'playlist' }
    });
    const { playlistItems, activeItem, handleDragStart, handleDragEnd, handleDragOver, } = useVideoPlaylistDragDrop(playlistId);
    return (_jsxs("div", { className: "video-playlist", children: [_jsx("h3", { children: "\u041F\u043B\u0435\u0439\u043B\u0438\u0441\u0442" }), _jsxs(DndContext, { onDragStart: handleDragStart, onDragOver: handleDragOver, onDragEnd: handleDragEnd, children: [_jsx("div", { ref: setNodeRef, className: `playlist-container ${isOver ? 'drag-over' : ''}`, children: _jsx(SortableContext, { items: playlistItems.map(item => item.id), strategy: verticalListSortingStrategy, children: playlistItems.length === 0 ? (_jsx("div", { className: "empty-playlist", children: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0432\u0438\u0434\u0435\u043E \u0441\u044E\u0434\u0430 \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u043B\u0435\u0439\u043B\u0438\u0441\u0442\u0430" })) : (playlistItems.map(item => (_jsx(PlaylistItemCard, { item: item }, item.id)))) }) }), _jsx(DragOverlay, { children: activeItem ? (_jsx(PlaylistItemCard, { item: activeItem, isDragging: true })) : null })] })] }));
};

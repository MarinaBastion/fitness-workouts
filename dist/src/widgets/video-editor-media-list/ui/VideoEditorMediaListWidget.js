import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { useGetMediaFilesQuery, extractMediaFiles } from '@/entities/media-file/api/mediaApi';
import { VideoListItem } from './VideoListItem';
import { useVirtualizedList } from '@/shared/hooks/useVirtualizedList';
import styles from './videoEditorMediaListWidget.module.css';
//TODO: move to constants
const PAGE_SIZE = 40;
const ITEM_HEIGHT = 140;
export const VideoEditorMediaListWidget = ({ categoryIds, isReady, }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [videos, setVideos] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const params = useMemo(() => ({ CategoryIds: categoryIds, PageNumber: pageNumber, PageSize: PAGE_SIZE }), [categoryIds, pageNumber]);
    const shouldSkip = !isReady || categoryIds.length === 0;
    const { data, isLoading, isFetching, isError } = useGetMediaFilesQuery(params, { skip: shouldSkip });
    useEffect(() => {
        var _a;
        if (!data)
            return;
        const pageItems = extractMediaFiles(data);
        setTotalCount((_a = data.content.totalCount) !== null && _a !== void 0 ? _a : 0);
        setVideos((prev) => (pageNumber === 1 ? pageItems : [...prev, ...pageItems]));
    }, [data, pageNumber]);
    const hasMore = videos.length < totalCount;
    const { scrollRef, virtualItems, totalSize } = useVirtualizedList({
        items: videos,
        itemHeight: ITEM_HEIGHT,
        loadMore: hasMore && !isFetching ? () => setPageNumber((prev) => prev + 1) : undefined,
    });
    if (shouldSkip)
        return _jsx("div", { className: styles.state, children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0443 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E" });
    if (isLoading && videos.length === 0)
        return _jsx("div", { className: styles.state, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0432\u0438\u0434\u0435\u043E..." });
    if (isError)
        return _jsx("div", { className: styles.state, children: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E" });
    return (_jsxs("section", { className: styles.section, children: [_jsx("h2", { className: styles.title, children: "\u0412\u0438\u0434\u0435\u043E" }), _jsx("div", { ref: scrollRef, style: { height: 500, overflow: 'auto' }, children: _jsx("div", { style: { height: 'auto', position: 'relative' }, children: virtualItems.map((virtualRow) => {
                        const file = videos[virtualRow.index];
                        if (!file)
                            return null;
                        return (_jsx("div", { style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                transform: `translateY(${virtualRow.start - 120}px)`,
                            }, children: _jsx(VideoListItem, { file: file, index: virtualRow.index + 1 }) }, file.id));
                    }) }) }), isFetching && _jsx("div", { className: styles.state, children: "\u041F\u043E\u0434\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0435\u0449\u0451..." }), !isFetching && videos.length === 0 && _jsx("div", { className: styles.state, children: "\u0412\u0438\u0434\u0435\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B" })] }));
};

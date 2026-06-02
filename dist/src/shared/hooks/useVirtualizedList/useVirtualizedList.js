import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';
export const useVirtualizedList = ({ items, itemHeight, loadMore, overscan = 5, }) => {
    const scrollRef = useRef(null);
    const virtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => itemHeight,
        overscan,
    });
    useEffect(() => {
        if (!loadMore)
            return;
        const virtualItems = virtualizer.getVirtualItems();
        if (!virtualItems.length)
            return;
        const lastItem = virtualItems[virtualItems.length - 1];
        if (lastItem.index >= items.length - 3) {
            loadMore();
        }
    }, [virtualizer.getVirtualItems(), items.length, loadMore]);
    return {
        scrollRef,
        virtualItems: virtualizer.getVirtualItems(),
        totalSize: virtualizer.getTotalSize(),
    };
};

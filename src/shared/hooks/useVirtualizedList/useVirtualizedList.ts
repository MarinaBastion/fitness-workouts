import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';

interface UseVirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  loadMore?: () => void;
  overscan?: number;
}

export const useVirtualizedList = <T>({
  items,
  itemHeight,
  loadMore,
  overscan = 5,
}: UseVirtualizedListProps<T>) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => itemHeight,
    overscan,
  });

  useEffect(() => {
    if (!loadMore) return;

    const virtualItems = virtualizer.getVirtualItems();
    if (!virtualItems.length) return;

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
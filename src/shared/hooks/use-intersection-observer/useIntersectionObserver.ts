import { RefObject, useEffect } from 'react';

interface UseIntersectionObserverParams {
  targetRef: RefObject<Element | null>;
  onIntersect: () => void;
  enabled?: boolean;
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = ({
  targetRef,
  onIntersect,
  enabled = true,
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: UseIntersectionObserverParams): void => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const target = targetRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        onIntersect();
      },
      { root, rootMargin, threshold }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onIntersect, root, rootMargin, targetRef, threshold]);
};

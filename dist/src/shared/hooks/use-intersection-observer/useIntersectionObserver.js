import { useEffect } from 'react';
export const useIntersectionObserver = ({ targetRef, onIntersect, enabled = true, root = null, rootMargin = '0px', threshold = 0, }) => {
    useEffect(() => {
        if (!enabled) {
            return;
        }
        const target = targetRef.current;
        if (!target) {
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            var _a;
            if (!((_a = entries[0]) === null || _a === void 0 ? void 0 : _a.isIntersecting)) {
                return;
            }
            onIntersect();
        }, { root, rootMargin, threshold });
        observer.observe(target);
        return () => {
            observer.disconnect();
        };
    }, [enabled, onIntersect, root, rootMargin, targetRef, threshold]);
};

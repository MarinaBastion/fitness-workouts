import { useLayoutEffect, useRef, } from 'react';
function setRef(ref, value) {
    if (!ref)
        return;
    if (typeof ref === 'function') {
        ref(value);
    }
    else {
        ref.current = value;
    }
}
export function useAutoWidthInput(forwardedRef, { value, defaultValue, placeholder, minWidth = 40, maxWidth = 1000, }) {
    var _a, _b;
    const inputRef = useRef(null);
    const sizerRef = useRef(null);
    const text = (_b = (_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : placeholder) !== null && _b !== void 0 ? _b : ' ';
    const ref = (node) => {
        inputRef.current = node;
        setRef(forwardedRef, node);
    };
    useLayoutEffect(() => {
        if (!inputRef.current || !sizerRef.current)
            return;
        const width = sizerRef.current.offsetWidth;
        const clamped = Math.min(Math.max(width, minWidth), maxWidth);
        inputRef.current.style.width = `${clamped}px`;
    }, [text, minWidth, maxWidth]);
    return {
        ref,
        sizerRef,
        text,
    };
}

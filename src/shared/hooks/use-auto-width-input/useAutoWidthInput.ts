import {
  ForwardedRef,
  useLayoutEffect,
  useRef,
} from 'react';

type Options = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  minWidth?: number;
  maxWidth?: number;
};

function setRef<T>(
  ref: ForwardedRef<T>,
  value: T
) {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    ref.current = value;
  }
}

export function useAutoWidthInput(
  forwardedRef: ForwardedRef<HTMLInputElement>,
  {
    value,
    defaultValue,
    placeholder,
    minWidth = 40,
    maxWidth = 1000,
  }: Options
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const sizerRef = useRef<HTMLSpanElement>(null);

  const text =
    value ??
    defaultValue ??
    placeholder ??
    ' ';

  const ref = (node: HTMLInputElement) => {
    inputRef.current = node;
    setRef(forwardedRef, node);
  };

  useLayoutEffect(() => {
    if (!inputRef.current || !sizerRef.current) return;

    const width = sizerRef.current.offsetWidth;

    const clamped = Math.min(
      Math.max(width, minWidth),
      maxWidth
    );

    inputRef.current.style.width = `${clamped}px`;
  }, [text, minWidth, maxWidth]);

  return {
    ref,
    sizerRef,
    text,
  };
}

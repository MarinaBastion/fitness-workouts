import {
  forwardRef,
  InputHTMLAttributes,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import s from './InputForm.module.css';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  minWidth?: number;
  maxWidth?: number;
  wrapperClassName?: string;
};

export const InputForm = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      minWidth = 40,
      maxWidth = 1000,
      className,
      wrapperClassName,
      value: controlledValue,
      defaultValue,
      onChange,
      ...rest
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? ''
    );

    const value = isControlled ? controlledValue : uncontrolledValue;

    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    // пробрасываем ref наружу
    const setRefs = (node: HTMLInputElement) => {
      inputRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useLayoutEffect(() => {
      debugger;
      if (!spanRef.current || !inputRef.current) return;

      const width = spanRef.current.offsetWidth;

      const clamped = Math.min(
        Math.max(width, minWidth),
        maxWidth
      );

      inputRef.current.style.width = `${clamped}px`;
    }, [value, minWidth, maxWidth]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className={clsx(s.autoWrapper, wrapperClassName)}>
        {label && <label>{label}</label>}

        <span
          ref={spanRef}
          className={s.autoSizer}
        >
          {value || ' '}
        </span>

        <input
          {...rest}
          ref={setRefs}
          value={value}
          onChange={handleChange}
          className={clsx(s.autoInput, className)}
        />

        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    );
  }
);

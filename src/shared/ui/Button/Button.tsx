import {
  forwardRef,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from 'react';
import clsx from 'clsx';
import s from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'danger';

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: Variant;
};

export const Button = forwardRef<HTMLButtonElement,Props>(function Button(
  {
    children,
    variant = 'primary',
    className,
    ...props
  },
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(
        s.button,
        s[`button--${variant}`],
        className
      )}
    >
      {children}
    </button>
  );
});

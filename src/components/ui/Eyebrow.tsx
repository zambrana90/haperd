import type { ComponentProps } from 'react';
import { cx } from './variants';

/**
 * A small label above a heading.
 * Use on white, off-white or blush only: its color fails AA on darker surfaces.
 */
export function Eyebrow({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      {...props}
      className={cx('font-mono text-sm uppercase tracking-widest text-rose-ink', className)}
    />
  );
}

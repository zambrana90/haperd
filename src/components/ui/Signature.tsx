import type { ComponentProps } from 'react';
import { cx } from './variants';

/**
 * A handwritten sign-off.
 * Use on white, off-white or blush only: its color fails AA on darker surfaces.
 */
export function Signature({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p {...props} className={cx('font-script text-3xl text-rose-ink', className)} />
  );
}

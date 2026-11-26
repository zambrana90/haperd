import type { ComponentProps } from 'react';
import { cx } from './variants';

/** Centers content, limits its width and keeps a side gutter (16px on phones). */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} className={cx('mx-auto w-full max-w-6xl px-gutter', className)} />
  );
}

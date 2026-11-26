import type { ComponentProps } from 'react';
import { cx } from './variants';

/** An introductory paragraph. Takes the surrounding text color. */
export function Lead({ className, ...props }: ComponentProps<'p'>) {
  return <p {...props} className={cx('text-lg md:text-xl', className)} />;
}

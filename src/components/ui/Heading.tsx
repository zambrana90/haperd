import type { ComponentProps } from 'react';
import { headingClasses, type HeadingLevel, type HeadingSize } from './variants';

export type HeadingProps = ComponentProps<'h1'> & {
  /** Sets the tag: `h1`, `h2` or `h3`. */
  level: HeadingLevel;
  /** Visual size. Defaults to the one that matches the level. */
  size?: HeadingSize;
};

/** Takes the surrounding text color. */
export function Heading({ level, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag {...props} className={headingClasses(level, size, className)} />;
}

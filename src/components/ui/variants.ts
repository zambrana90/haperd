/** Joins class names, skipping empty values. It does not resolve Tailwind conflicts. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

const BUTTON_BASE = cx(
  'inline-flex min-h-12 min-w-12 cursor-pointer items-center justify-center gap-2',
  'rounded-pill border-2 px-6 py-2 text-center font-sans text-base font-semibold',
  'transition-[color,background-color,translate] duration-fast ease-gentle',
  'motion-safe:not-disabled:hover:-translate-y-0.5',
  // Two-tone focus ring, so it shows on both light and dark surfaces.
  'focus-visible:ring-4 focus-visible:ring-white',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy',
  'disabled:cursor-not-allowed disabled:opacity-50',
  // A loading button is disabled too, but stays fully legible.
  'aria-busy:disabled:cursor-progress aria-busy:disabled:opacity-100',
);

const BUTTON_VARIANTS = {
  primary:
    'border-rose-deep bg-rose-deep text-white not-disabled:hover:border-navy not-disabled:hover:bg-navy',
  secondary:
    'border-rose-deep bg-white text-rose-ink not-disabled:hover:bg-blush',
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  className?: string,
): string {
  return cx(BUTTON_BASE, BUTTON_VARIANTS[variant], className);
}

const HEADING_SIZES = {
  display: 'text-5xl leading-tight md:text-7xl',
  title: 'text-3xl leading-tight md:text-5xl',
  subtitle: 'text-xl leading-snug md:text-2xl',
} as const;

export type HeadingLevel = 1 | 2 | 3;
export type HeadingSize = keyof typeof HEADING_SIZES;

const DEFAULT_HEADING_SIZE: Record<HeadingLevel, HeadingSize> = {
  1: 'display',
  2: 'title',
  3: 'subtitle',
};

/** The level picks the default look; `size` changes the look without changing the tag. */
export function headingClasses(
  level: HeadingLevel,
  size: HeadingSize = DEFAULT_HEADING_SIZE[level],
  className?: string,
): string {
  return cx('font-serif font-bold text-balance wrap-break-word', HEADING_SIZES[size], className);
}

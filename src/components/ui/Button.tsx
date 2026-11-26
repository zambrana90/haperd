import Link from 'next/link';
import type { ComponentProps } from 'react';
import { buttonClasses, type ButtonVariant } from './variants';

type NativeButtonProps = ComponentProps<'button'> & {
  href?: never;
  /** Shows a spinner, sets `aria-busy` and blocks clicks. The label stays. */
  loading?: boolean;
};

type LinkButtonProps = ComponentProps<typeof Link> & {
  // Links have no disabled or loading state.
  disabled?: never;
  loading?: never;
};

export type ButtonProps = { variant?: ButtonVariant } & (
  | NativeButtonProps
  | LinkButtonProps
);

/** A `<button>`, or a Next `<Link>` with the same look when `href` is set. */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, className, ...linkProps } = props;
    return <Link {...linkProps} className={buttonClasses(variant, className)} />;
  }

  const {
    variant,
    className,
    loading = false,
    disabled,
    type = 'button',
    children,
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses(variant, className)}
    >
      {loading ? (
        <span
          aria-hidden='true'
          className='size-4 shrink-0 rounded-pill border-2 border-current border-t-transparent motion-safe:animate-spin'
        />
      ) : null}
      {children}
    </button>
  );
}

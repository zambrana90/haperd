import { useId, type ComponentProps, type ReactNode } from 'react';
import { Container } from './Container';
import { cx } from './variants';

export type SectionProps = ComponentProps<'section'> & {
  /** Usually a `<Heading>`. It names the section for screen readers. */
  heading?: ReactNode;
};

/**
 * A `<section>` with vertical spacing. The heading and children sit in a
 * `<Container>`, so a background set with `className` spans the full width.
 */
export function Section({
  heading,
  className,
  children,
  ...props
}: SectionProps) {
  const headingId = useId();
  const hasHeading = Boolean(heading);

  return (
    <section
      {...props}
      aria-labelledby={hasHeading ? headingId : props['aria-labelledby']}
      className={cx('py-section', className)}
    >
      <Container>
        {hasHeading ? (
          <div id={headingId} className='mb-8'>
            {heading}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

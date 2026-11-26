import type { ReactNode } from 'react';

const SIDE_BUTTON = 'absolute hidden w-1 bg-navy lg:block';

/**
 * A plain phone drawn around its content from `lg` up. Below that its two
 * wrappers take no part in the layout. It has no height of its own, so it grows
 * with the content.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className='contents lg:relative lg:flex lg:flex-col lg:rounded-[calc(var(--radius-card)*2)] lg:bg-navy lg:p-3 lg:shadow-lifted'>
      <span aria-hidden='true' className={`${SIDE_BUTTON} top-28 -left-1 h-12 rounded-l-pill`} />
      <span aria-hidden='true' className={`${SIDE_BUTTON} top-44 -left-1 h-12 rounded-l-pill`} />
      <span aria-hidden='true' className={`${SIDE_BUTTON} top-36 -right-1 h-20 rounded-r-pill`} />
      {/* The screen. Its corners follow the frame's, less the bezel. */}
      <div className='contents lg:flex lg:flex-1 lg:flex-col lg:rounded-[calc(var(--radius-card)*1.5)] lg:bg-blush'>
        <span
          aria-hidden='true'
          className='mx-auto mt-3 hidden h-6 w-28 shrink-0 rounded-pill bg-navy lg:block'
        />
        {children}
        <span
          aria-hidden='true'
          className='mx-auto mb-2 hidden h-1 w-28 shrink-0 rounded-pill bg-navy lg:block'
        />
      </div>
    </div>
  );
}

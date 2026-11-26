import { ViewTransition, type ReactNode } from 'react';

/**
 * Fades one page into the next on in-app navigation. Wrap each page's root: a
 * layout stays mounted, so enter and exit would never run there. The animation
 * is in globals.css. Browsers without view transitions just swap the pages.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter='page' exit='page' default='none'>
      {children}
    </ViewTransition>
  );
}

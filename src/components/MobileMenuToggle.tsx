'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';
import { cx, FEEDBACK_TRANSITION, PRESS_FEEDBACK } from './ui/variants';

const PANEL_ID = 'mobile-menu-panel';

/**
 * A `<details>` disclosure, so the menu opens without JavaScript. With
 * JavaScript it adds `aria-expanded` and closes on Escape, on an outside tap,
 * when focus leaves it and on navigation.
 */
export function MobileMenuToggle({ children }: { children: ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const buttonRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  function close() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  function closeAndRefocus() {
    close();
    buttonRef.current?.focus();
  }

  useEffect(() => {
    const details = detailsRef.current;
    const button = buttonRef.current;
    const backdrop = backdropRef.current;
    if (!details || !button || !backdrop) return;

    const syncExpanded = () =>
      button.setAttribute('aria-expanded', String(details.open));
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !details.open) return;
      details.open = false;
      button.focus();
    };

    // Without JavaScript nothing could dismiss the backdrop, so it starts hidden.
    backdrop.hidden = false;
    syncExpanded();
    details.addEventListener('toggle', syncExpanded);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      details.removeEventListener('toggle', syncExpanded);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  // Closes the menu when the page changes.
  useEffect(() => {
    const details = detailsRef.current;
    return () => {
      if (details) details.open = false;
    };
  }, [pathname]);

  return (
    <details
      ref={detailsRef}
      // Keeps the panel rendered while it animates closed.
      className='group motion-safe:details-content:transition-[content-visibility] motion-safe:details-content:transition-discrete motion-safe:details-content:duration-base'
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (next && !event.currentTarget.contains(next)) close();
      }}
    >
      <summary
        ref={buttonRef}
        aria-label='Abrir menú'
        aria-controls={PANEL_ID}
        className={cx(
          'relative z-50 flex size-11 cursor-pointer list-none flex-col items-center justify-center gap-1 rounded-field bg-white text-ink shadow-soft hover:bg-blush focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy [&::-webkit-details-marker]:hidden',
          FEEDBACK_TRANSITION,
          PRESS_FEEDBACK,
        )}
      >
        <span className='h-0.5 w-6 bg-current' />
        <span className='h-0.5 w-6 bg-current' />
        <span className='h-0.5 w-6 bg-current' />
      </summary>
      {/* Catches taps outside the open menu. */}
      <div
        ref={backdropRef}
        hidden
        aria-hidden='true'
        className='fixed inset-0 z-40 not-group-open:hidden'
        onClick={closeAndRefocus}
      />
      <div
        id={PANEL_ID}
        // Fades and slides from the closed state; `starting` covers the first frame.
        className='absolute top-18 left-0 z-50 w-full bg-white shadow-lifted motion-safe:transition-[opacity,translate] motion-safe:duration-base motion-safe:ease-enter motion-safe:not-group-open:pointer-events-none motion-safe:not-group-open:-translate-y-2 motion-safe:not-group-open:opacity-0 motion-safe:starting:-translate-y-2 motion-safe:starting:opacity-0'
        onClick={(event) => {
          if ((event.target as Element).closest('a')) closeAndRefocus();
        }}
      >
        {children}
      </div>
    </details>
  );
}

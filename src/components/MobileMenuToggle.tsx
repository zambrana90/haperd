'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';

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
      className='group'
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (next && !event.currentTarget.contains(next)) close();
      }}
    >
      <summary
        ref={buttonRef}
        aria-label='Abrir menú'
        aria-controls={PANEL_ID}
        className='relative z-50 flex size-11 cursor-pointer list-none flex-col items-center justify-center gap-1 rounded-field bg-white text-ink shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy [&::-webkit-details-marker]:hidden'
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
        className='absolute top-18 left-0 z-50 w-full animate-fade-in bg-white shadow-lifted'
        onClick={(event) => {
          if ((event.target as Element).closest('a')) closeAndRefocus();
        }}
      >
        {children}
      </div>
    </details>
  );
}

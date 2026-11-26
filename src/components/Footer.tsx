import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE } from '@/content/site';

const LINK_CLASSES =
  'flex min-h-11 min-w-11 items-center justify-center rounded-field focus-visible:outline-2 focus-visible:outline-navy';

export function Footer() {
  // Pages are static, so this is the year of the latest deployment.
  const year = new Date().getFullYear();

  return (
    <footer className='w-full bg-rose font-mono text-sm text-ink'>
      <div className='mx-auto flex w-full max-w-400 flex-col items-center justify-between gap-3 px-gutter py-4 sm:flex-row'>
        <p className='text-center'>
          {year} All rights Reserved {SITE.name}
        </p>
        <div className='flex flex-wrap items-center justify-center gap-3'>
          <Link
            href='/contact'
            className={`${LINK_CLASSES} px-3 underline underline-offset-4 hover:no-underline`}
          >
            Contacto
          </Link>
          <SocialLink href={SITE.social.instagram} label='Instagram'>
            <rect
              x='6'
              y='6'
              width='24'
              height='24'
              rx='7'
              stroke='currentColor'
              strokeWidth='2'
            />
            <circle cx='18' cy='18' r='7' stroke='currentColor' strokeWidth='2' />
            <circle cx='25.5' cy='12.5' r='1.5' fill='currentColor' />
          </SocialLink>
          {SITE.social.whatsapp ? (
            <SocialLink href={SITE.social.whatsapp} label='WhatsApp'>
              <circle cx='18' cy='18' r='16' stroke='currentColor' strokeWidth='2' />
              <path
                d='M24 22.5c-.3-.15-1.75-.87-2.02-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.5-.89-.79-1.49-1.76-1.67-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.57-.48-.5-.67-.51-.17-.01-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.26 5.18 4.44.72.28 1.28.45 1.72.58.72.23 1.38.2 1.9.12.58-.09 1.75-.72 2-1.41.25-.7.25-1.3.17-1.41-.09-.12-.27-.19-.57-.34z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </SocialLink>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

type SocialLinkProps = {
  href: string;
  label: string;
  /** The icon's shapes, on a 36 × 36 grid. */
  children: ReactNode;
};

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
      className={`${LINK_CLASSES} transition-[translate] duration-fast ease-gentle motion-safe:hover:-translate-y-0.5`}
    >
      <svg aria-hidden='true' viewBox='0 0 36 36' fill='none' className='size-9'>
        {children}
      </svg>
    </a>
  );
}

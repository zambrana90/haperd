'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/content/navigation';

type NavLinkProps = NavItem & {
  className: string;
  starClassName: string;
};

/** A nav link that marks the current page with `aria-current` and a star. */
export function NavLink({ href, label, className, starClassName }: NavLinkProps) {
  const isCurrent = usePathname() === href;

  return (
    <Link
      href={href}
      className={className}
      aria-current={isCurrent ? 'page' : undefined}
    >
      <span
        aria-hidden='true'
        className={`${starClassName} ${isCurrent ? '' : 'invisible'}`}
      >
        ★
      </span>
      <span>{label}</span>
    </Link>
  );
}

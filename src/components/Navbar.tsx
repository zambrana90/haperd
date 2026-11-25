'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileMenu } from './MobileMenu';

const NAV_ITEMS = [
  { href: '/', label: 'Haperd' },
  { href: '/live-art', label: 'Live art' },
  { href: '/about-us', label: 'About us' },
  { href: '/contact', label: 'Contacto' },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <>
      {/* Mobile hamburger menu (only below sm) */}
      <div className='sm:hidden'>
        <MobileMenu />
      </div>
      {/* Desktop/tablet navbar (only sm+) */}
      {/* Desktop/tablet navbar (only sm+) */}
      <div className='hidden sm:flex flex-col items-center w-full'>
        <ul
          className='flex justify-between rounded-full px-8 pt-0 shadow-md items-stretch h-16 md:h-20 gap-2 md:gap-4 text-xl font-mono w-full'
          style={{ backgroundColor: 'rgb(189, 138, 135)', opacity: 0.9 }}
        >
          {NAV_ITEMS.map((item, idx) => [
            idx !== 0 ? (
              <li
                className='flex items-center navbar-divider'
                aria-hidden='true'
                key={item.label + '-divider'}
              >
                <span
                  className='mx-2 w-px flex-shrink-0 py-2 self-center'
                  style={{
                    backgroundColor: 'rgb(29, 42, 80)',
                    height: '45%',
                  }}
                />
              </li>
            ) : null,
            <li
              key={item.href}
              className='flex items-center h-full'
              style={{ color: 'rgb(29, 42, 80)' }}
            >
              <Link
                href={item.href}
                className='flex flex-col items-center h-full'
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                <span
                  className='text-base md:text-lg text-white'
                  style={{
                    opacity:
                      pathname === item.href ||
                      (item.href === '/' && pathname === '/')
                        ? 1
                        : 0,
                  }}
                >
                  ★
                </span>
                <span className='mt-1'>{item.label}</span>
              </Link>
            </li>,
          ])}
        </ul>
      </div>
    </>
  );
}

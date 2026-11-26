import { NAV_ITEMS } from '@/content/navigation';
import { NavLink } from './NavLink';
import { cx, LINK_FEEDBACK } from './ui/variants';

/** The nav bar for `sm` and up. Phones use `MobileMenu`. */
export function Navbar() {
  return (
    <ul className='hidden h-16 w-full rounded-pill bg-rose px-4 font-mono text-ink shadow-soft sm:flex md:h-20 md:px-6'>
      {NAV_ITEMS.map((item) => (
        <li
          key={item.href}
          // The `before` classes draw the divider between items.
          className='relative flex flex-1 items-center justify-center not-first:before:absolute not-first:before:left-0 not-first:before:h-2/5 not-first:before:w-px not-first:before:bg-navy'
        >
          <NavLink
            {...item}
            className={cx(
              'flex h-full min-w-11 flex-col items-center justify-center rounded-pill px-3 text-base underline decoration-transparent underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-navy md:text-lg',
              LINK_FEEDBACK,
            )}
            starClassName='text-base leading-none text-white md:text-lg'
          />
        </li>
      ))}
    </ul>
  );
}

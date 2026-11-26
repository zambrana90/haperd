import { NAV_ITEMS } from '@/content/navigation';
import { MobileMenuToggle } from './MobileMenuToggle';
import { NavLink } from './NavLink';

/** The nav menu for phones. */
export function MobileMenu() {
  return (
    <nav className='sm:hidden'>
      <MobileMenuToggle>
        <ul className='flex flex-col gap-2 p-4 font-mono'>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavLink
                {...item}
                className='flex min-h-12 items-center gap-3 rounded-field px-4 text-lg text-ink transition-colors duration-fast hover:bg-blush focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy aria-[current=page]:bg-blush aria-[current=page]:font-bold'
                starClassName='text-rose-deep'
              />
            </li>
          ))}
        </ul>
      </MobileMenuToggle>
    </nav>
  );
}

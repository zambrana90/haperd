import { NAV_ITEMS } from '@/content/navigation';
import { MobileMenuToggle } from './MobileMenuToggle';
import { NavLink } from './NavLink';
import { cx, FEEDBACK_TRANSITION, PRESS_FEEDBACK } from './ui/variants';

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
                className={cx(
                  'flex min-h-12 items-center gap-3 rounded-field px-4 text-lg text-ink hover:bg-blush focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy aria-[current=page]:bg-blush aria-[current=page]:font-bold',
                  // Full-width rows: no hover lift.
                  FEEDBACK_TRANSITION,
                  PRESS_FEEDBACK,
                )}
                starClassName='text-rose-deep'
              />
            </li>
          ))}
        </ul>
      </MobileMenuToggle>
    </nav>
  );
}

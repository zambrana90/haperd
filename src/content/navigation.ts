export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/', label: 'Haperd' },
  { href: '/live-art', label: 'Live art' },
  { href: '/about-us', label: 'About us' },
  { href: '/contact', label: 'Contacto' },
];

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Haperd' },
  { href: '/live-art', label: 'Live art' },
  { href: '/about-us', label: 'About us' },
  { href: '/contact', label: 'Contacto' },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="sm:hidden">
      <button
        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#b18a8b]"
        aria-label="Abrir menú"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="block w-6 h-0.5 bg-[#b18a8b] mb-1" />
        <span className="block w-6 h-0.5 bg-[#b18a8b] mb-1" />
        <span className="block w-6 h-0.5 bg-[#b18a8b]" />
      </button>
      {open && (
        <div className="absolute left-0 top-16 w-full bg-white shadow-lg z-50 animate-fade-in">
          <ul className="flex flex-col p-4 gap-2 font-mono">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-4 py-3 rounded text-[#2a2341] text-lg transition-colors ${pathname === item.href ? 'bg-[#f5e6e6] font-bold' : 'hover:bg-[#f5e6e6]'}`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

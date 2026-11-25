'use client';

import Image from 'next/image';
import { Navbar } from './Navbar';
import { MobileMenu } from './MobileMenu';

interface HeaderDynamicProps {
  variant?: 'default' | 'contact';
  title?: string;
  subtitle?: string;
}

export function Header({
  variant = 'default',
  title,
  subtitle,
}: HeaderDynamicProps) {
  // Contact variant: lower height, no background image, different colors
  if (variant === 'contact') {
    return (
      <header className='relative w-full md:h-[170px] flex flex-col items-center bg-white mb-1 md:mb-24'>
        <div className='relative z-10 flex flex-col w-full max-w-2xl mx-auto pt-2 md:pt-12'>
          {/* Top bar: hamburger left, title/subtitle centered on mobile */}
          <div className='flex items-center w-full sm:block'>
            <div className='flex-none sm:hidden pl-2'>
              <MobileMenu />
            </div>
            <div className='flex-1 flex flex-col items-center sm:items-center w-full'>
              <h1 className='text-3xl md:text-6xl font-serif font-bold text-[#b18a8b] drop-shadow-lg leading-tight text-center w-full'>
                {title || 'Haperd and co.'}
              </h1>
              <span className='text-sm sm:text-base md:text-lg mt-1 mb-1 sm:mb-2 md:mb-3 drop-shadow text-right mr-64 w-full text-[#b18a8b]'>
                {subtitle || 'Live event illustration'}
              </span>
            </div>
          </div>
          {/* Navbar only on sm+ */}
          <nav className='hidden sm:block mt-2'>
            <Navbar />
          </nav>
        </div>
      </header>
    );
  }
  // Default variant: original header with background image
  return (
    <header className='relative w-full h-[260px] sm:h-[380px] md:h-[550px] flex flex-col items-center text-white'>
      <Image
        src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
        alt='Background painting with pincels'
        fill
        style={{ objectFit: 'cover', zIndex: 0 }}
        className='absolute inset-0 w-full h-full object-cover object-center -z-10'
        priority
      />
      <div className='relative z-10 flex flex-col w-full max-w-2xl mx-auto pt-2 md:pt-12'>
        <div className='flex items-center w-full sm:block'>
          <div className='flex-none sm:hidden pl-2'>
            <MobileMenu />
          </div>
          <div className='flex-1 flex flex-col items-center sm:items-center w-full'>
            <h1 className='text-3xl md:text-6xl font-serif font-bold drop-shadow-lg leading-tight text-center w-full'>
              Haperd and co.
            </h1>
            <span className='text-base sm:text-lg w-full mt-1 mb-2 drop-shadow text-right mr-64 text-[#b18a8b]'>
              Live event illustration
            </span>
          </div>
        </div>
        <nav className='hidden sm:block mt-2'>
          <Navbar />
        </nav>
      </div>
    </header>
  );
}

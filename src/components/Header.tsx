import Image from 'next/image';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import { Navbar } from './Navbar';
import { SkipLink } from './SkipLink';
import { cx } from './ui/variants';

type HeaderProps = {
  variant?: 'large' | 'compact';
};

export function Header({ variant = 'large' }: HeaderProps) {
  return variant === 'large' ? <LargeHeader /> : <CompactHeader />;
}

/** Over a background image. */
function LargeHeader() {
  return (
    <header className='relative flex min-h-90 w-full bg-navy flex-col sm:min-h-125 md:min-h-160 lg:min-h-180'>
      <SkipLink />
      {/*
        A square 1080px photo, cropped by object-cover. The header heights and
        object positions keep the hands and the drawing in view, mostly below
        the brand card and the nav bar. Check them if either changes. It is
        never drawn wider than the file; wider screens fade its sides into navy.
      */}
      <div className='absolute inset-0 mx-auto max-w-270 overflow-hidden min-[67.5rem]:mask-x-from-85%'>
        <Image
          src='/images/hero/live-art-drawing.jpg'
          alt=''
          fill
          sizes='(min-width: 1080px) 1080px, (max-width: 359px) 360px, 100vw'
          preload
          fetchPriority='high'
          className='object-cover object-[50%_20%] motion-safe:animate-hero-settle md:object-[50%_25%] lg:object-[50%_16%]'
        />
      </div>
      <HeaderContent navClassName='motion-safe:animate-hero-rise-late'>
        {/* A solid card keeps the text readable over any image. */}
        <Brand
          className='rounded-card bg-off-white px-4 py-2 shadow-soft motion-safe:animate-hero-rise sm:px-8'
          taglineClassName='text-ink'
        />
      </HeaderContent>
    </header>
  );
}

/** No image. */
function CompactHeader() {
  return (
    <header className='relative flex w-full flex-col bg-white pb-2'>
      <SkipLink />
      <HeaderContent>
        <Brand taglineClassName='text-rose-ink' />
      </HeaderContent>
    </header>
  );
}

type HeaderContentProps = {
  children: React.ReactNode;
  navClassName?: string;
};

/**
 * The menu button and brand share a row on phones. The nav bar sits below from
 * `sm`. Never animate an ancestor of the menu: a transform would trap its
 * full-screen backdrop.
 */
function HeaderContent({ children, navClassName }: HeaderContentProps) {
  return (
    <div className='relative z-10 mx-auto flex w-full max-w-2xl flex-col gap-3 px-gutter pt-2 md:pt-12'>
      <div className='flex items-start gap-2'>
        <div className='sm:hidden'>
          <MobileMenu />
        </div>
        <div className='flex min-w-0 flex-1 justify-center'>{children}</div>
      </div>
      <nav className={cx('hidden sm:block', navClassName)}>
        <Navbar />
      </nav>
    </div>
  );
}

type BrandProps = {
  className?: string;
  taglineClassName: string;
};

function Brand({ className = '', taglineClassName }: BrandProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <Link
        href='/'
        className='flex min-h-11 items-center rounded-field font-serif text-2xl leading-tight font-bold text-rose-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy min-[24rem]:text-3xl md:text-6xl'
      >
        Haperd and co.
      </Link>
      <p className={`text-sm sm:text-base md:text-lg ${taglineClassName}`}>
        Live event illustration
      </p>
    </div>
  );
}

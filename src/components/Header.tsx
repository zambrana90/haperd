import Image from 'next/image';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import { Navbar } from './Navbar';
import { SkipLink } from './SkipLink';

type HeaderProps = {
  /** `contact` is a temporary alias of `compact`, until the pages stop using it. */
  variant?: 'large' | 'compact' | 'contact';
};

export function Header({ variant = 'large' }: HeaderProps) {
  return variant === 'large' ? <LargeHeader /> : <CompactHeader />;
}

/** Over a background image. */
function LargeHeader() {
  return (
    <header className='relative flex min-h-65 w-full flex-col sm:min-h-95 md:min-h-137.5'>
      <SkipLink />
      <Image
        src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
        alt=''
        fill
        sizes='100vw'
        preload
        className='object-cover object-center'
      />
      <HeaderContent>
        {/* A solid card keeps the text readable over any image. */}
        <Brand
          className='rounded-card bg-off-white px-4 py-2 shadow-soft sm:px-8'
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

/** The menu button and brand share a row on phones. The nav bar sits below from `sm`. */
function HeaderContent({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative z-10 mx-auto flex w-full max-w-2xl flex-col gap-3 px-gutter pt-2 md:pt-12'>
      <div className='flex items-start gap-2'>
        <div className='sm:hidden'>
          <MobileMenu />
        </div>
        <div className='flex min-w-0 flex-1 justify-center'>{children}</div>
      </div>
      <nav className='hidden sm:block'>
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

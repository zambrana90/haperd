import Image from 'next/image';
import type { Service } from '@/content/home';

/*
 * Rendered widths. A row's photo column is half the container, less half the
 * gap, from `md` (32rem at most). Below it, the column is the container's
 * width, up to 32rem. A pair draws its photos at 80% and 60% of the column.
 */
const SIZES = {
  single:
    '(min-width: 72rem) 512px, (min-width: 64rem) calc(50vw - 64px), (min-width: 50rem) calc(50vw - 52px), (min-width: 48rem) calc(46vw - 20px), (min-width: 35rem) 512px, (min-width: 25rem) 92vw, calc(100vw - 32px)',
  back: '(min-width: 72rem) 410px, (min-width: 64rem) calc(40vw - 51px), (min-width: 50rem) calc(40vw - 42px), (min-width: 48rem) calc(37vw - 16px), (min-width: 35rem) 410px, (min-width: 25rem) 74vw, calc(80vw - 26px)',
  front:
    '(min-width: 72rem) 307px, (min-width: 64rem) calc(30vw - 38px), (min-width: 50rem) calc(30vw - 31px), (min-width: 48rem) calc(28vw - 12px), (min-width: 35rem) 307px, (min-width: 25rem) 55vw, calc(60vw - 19px)',
};

/** A square: one photo, or two overlapping from opposite corners. */
export function ServicePhotos({ photos }: Pick<Service, 'photos'>) {
  const [first, second] = photos;

  if (!second) {
    return (
      <Image
        {...first}
        alt={first.alt}
        sizes={SIZES.single}
        className='aspect-square h-auto w-full rounded-card object-cover shadow-soft'
      />
    );
  }

  return (
    <div className='relative aspect-square w-full'>
      <Image
        {...first}
        alt={first.alt}
        sizes={SIZES.back}
        className='absolute top-0 left-0 h-auto w-4/5 rounded-card shadow-soft'
      />
      <Image
        {...second}
        alt={second.alt}
        sizes={SIZES.front}
        className='absolute right-0 bottom-0 h-auto w-3/5 rounded-card border-4 border-white shadow-lifted'
      />
    </div>
  );
}

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import type { Service } from '@/content/home';
import { ServicePhotos } from './ServicePhotos';

/**
 * One row per service: photo above text on phones, side by side from `md`, with
 * the photo's side alternating. Only CSS swaps it: in the document the photo
 * always comes first.
 */
export function ServiceRows({ services }: { services: readonly Service[] }) {
  return (
    <ul className='mx-auto flex max-w-lg flex-col gap-16 md:max-w-none md:gap-24'>
      {services.map((service) => (
        <li
          key={service.title}
          className='group reveal grid gap-6 md:grid-cols-2 md:items-center md:gap-10 lg:gap-16'
        >
          <div className='md:group-even:order-last'>
            <ServicePhotos photos={service.photos} />
          </div>
          <div className='flex flex-col items-start gap-4'>
            <Heading level={3} className='max-w-full lg:text-4xl'>
              {service.title}
            </Heading>
            {service.description.map((paragraph) => (
              <p key={paragraph} className='text-lg'>
                {paragraph}
              </p>
            ))}
            <Button href={service.link.href} variant='secondary'>
              {service.link.label}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

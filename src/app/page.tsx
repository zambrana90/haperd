import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';
import { Section } from '@/components/ui/Section';
import { PAGE_SEO } from '@/content/seo';
import { SERVICES, type Service } from '@/content/home';
import { pageMetadata } from '@/lib/seo/page-metadata';

export const metadata = pageMetadata(PAGE_SEO.home);

// Rendered widths: the card's inner width, and 80% and 60% of it for a pair.
const PHOTO_SIZES = {
  single:
    '(min-width: 72rem) 280px, (min-width: 64rem) 25vw, (min-width: 34rem) 464px, calc(100vw - 5rem)',
  back: '(min-width: 72rem) 224px, (min-width: 64rem) 20vw, (min-width: 34rem) 372px, 64vw',
  front:
    '(min-width: 72rem) 168px, (min-width: 64rem) 15vw, (min-width: 34rem) 278px, 48vw',
};

/** A square: one photo, or two overlapping from opposite corners. */
function ServicePhotos({ photos }: Pick<Service, 'photos'>) {
  const [first, second] = photos;

  if (!second) {
    return (
      <Image
        {...first}
        alt={first.alt}
        sizes={PHOTO_SIZES.single}
        className='aspect-square h-auto w-full rounded-card object-cover'
      />
    );
  }

  return (
    <div className='relative aspect-square w-full'>
      <Image
        {...first}
        alt={first.alt}
        sizes={PHOTO_SIZES.back}
        className='absolute top-0 left-0 h-auto w-4/5 rounded-card'
      />
      <Image
        {...second}
        alt={second.alt}
        sizes={PHOTO_SIZES.front}
        className='absolute right-0 bottom-0 h-auto w-3/5 rounded-card border-4 border-white shadow-lifted'
      />
    </div>
  );
}

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header variant='large' />

      <main id='main' className='flex-1 bg-blush text-ink'>
        {/* The intro card overlaps the hero image. No z-index, so the mobile menu stays on top. */}
        <Container className='relative -mt-8 md:-mt-20'>
          <div className='grid gap-6 rounded-card bg-off-white p-6 shadow-lifted sm:p-10 lg:grid-cols-[2fr_3fr] lg:gap-12 lg:p-14'>
            <div>
              <Heading level={1} className='md:text-8xl'>
                Haperd
              </Heading>
              <Lead className='mt-4 font-serif text-balance md:text-2xl'>
                En Haperd and Co. no hacemos papelería, creamos momentos.
              </Lead>
            </div>
            <Lead className='lg:self-center'>
              <span className='font-semibold'>Invitaciones</span> que cuentan
              historias, <span className='italic'>menús</span> que se leen con
              una sonrisa y <span className='font-semibold'>detalles</span> que
              hacen que cada invitado se sienta parte de algo único. Nuestro
              equipo está para escucharos, soñar con vosotros y dar forma a esa
              invitación que solo podía ser vuestra. ¿Clásica y elegante?
              Perfecto. ¿Divertida, diferente y un poquito loca? ¡También nos
              encanta!
            </Lead>
          </div>
        </Container>

        <Section
          heading={
            <Heading level={2} className='text-center'>
              ¿Qué ofrecemos?
            </Heading>
          }
        >
          {/* One column, then three with the middle one set lower. */}
          <ul className='mx-auto grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3 lg:items-start'>
            {SERVICES.map((service) => (
              <li
                key={service.title}
                className='flex flex-col items-start gap-4 rounded-card bg-white p-6 shadow-soft lg:p-8 lg:nth-2:mt-24'
              >
                <ServicePhotos photos={service.photos} />
                <Heading level={3} className='mt-2'>
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
              </li>
            ))}
          </ul>
        </Section>

        <Section
          className='bg-navy text-center text-off-white'
          heading={<Heading level={2}>¿Hablamos?</Heading>}
        >
          <Button href='/contact' variant='secondary'>
            Escribidnos
          </Button>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

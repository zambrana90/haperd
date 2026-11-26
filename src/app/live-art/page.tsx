import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';
import { Section } from '@/components/ui/Section';
import { PAGE_SEO } from '@/content/seo';
import { LIVE_ART_PHOTO, SAMPLE_STEPS } from '@/content/live-art';
import { pageMetadata } from '@/lib/seo/page-metadata';

export const metadata = pageMetadata(PAGE_SEO.liveArt);

const STEPS_ID = 'como-trabajamos';
// The id is on the Contact page's form.
const CONTACT_HREF = '/contact#formulario';

export default function LiveArt() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header variant='large' />

      <main id='main' className='flex-1 bg-blush text-ink'>
        {/* The intro card overlaps the hero image. No z-index, so the mobile menu stays on top. */}
        <Container className='relative -mt-8 pb-section md:-mt-20'>
          <div className='grid gap-8 rounded-card bg-off-white p-6 shadow-lifted sm:p-10 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-12 lg:p-14'>
            <div>
              <Heading level={1} className='md:text-8xl'>
                Live art
              </Heading>
              <Lead className='mt-6 font-serif'>
                Y atención, que aquí viene la magia...
                <br />
                ¿Conoces la papelería creativa? ¿Y el arte en vivo en eventos?
                Te lo contamos...
              </Lead>
              <Lead className='mt-6'>
                Tenemos un servicio que convierte los recuerdos en arte en
                tiempo real: arte en vivo. Sí, como lo lees. Nuestro equipo de
                artistas se planta en vuestro evento pincel en mano para
                capturar los momentos más bonitos y retratar a vuestros
                invitados en directo.
              </Lead>
              <Lead className='mt-6'>
                Cada ilustración se convierte en un regalo único, emotivo y
                absolutamente inolvidable que se llevan a casa. ¡La gente
                alucina!
              </Lead>
              <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                <Button href={CONTACT_HREF}>¿Hablamos?</Button>
                <Button href={`#${STEPS_ID}`} variant='secondary'>
                  ¿Cómo trabajamos?
                </Button>
              </div>
            </div>
            <Image
              {...LIVE_ART_PHOTO}
              alt={LIVE_ART_PHOTO.alt}
              sizes='(min-width: 72rem) 400px, (min-width: 64rem) 35vw, (min-width: 28rem) 384px, calc(100vw - 5rem)'
              className='mx-auto h-auto w-full max-w-sm rounded-card shadow-soft lg:max-w-none'
            />
          </div>
        </Container>

        <Section
          id={STEPS_ID}
          className='bg-white'
          heading={
            <Heading level={2} className='text-center'>
              ¿Cómo trabajamos?
            </Heading>
          }
        >
          <p className='mx-auto mb-8 w-fit rounded-pill border-2 border-dashed border-rose-deep px-4 py-1 font-mono text-sm font-bold uppercase tracking-widest text-rose-ink'>
            Texto de ejemplo
          </p>
          <ol className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {SAMPLE_STEPS.map((step, index) => (
              <li key={step.title} className='rounded-card bg-blush p-6 shadow-soft'>
                {/* The list already announces the position. */}
                <span aria-hidden='true' className='font-mono text-3xl text-rose-ink'>
                  {index + 1}
                </span>
                <Heading level={3} className='my-3'>
                  {step.title}
                </Heading>
                <p className='text-lg'>{step.description}</p>
              </li>
            ))}
          </ol>
          <div className='mt-10 flex justify-center'>
            <Button href={CONTACT_HREF}>¿Hablamos?</Button>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

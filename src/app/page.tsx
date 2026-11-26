import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ServiceRows } from '@/components/home/ServiceRows';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';
import { Section } from '@/components/ui/Section';
import { PAGE_SEO } from '@/content/seo';
import { SERVICES } from '@/content/home';
import { pageMetadata } from '@/lib/seo/page-metadata';

export const metadata = pageMetadata(PAGE_SEO.home);

export default function Home() {
  return (
    <PageTransition>
      <div className='flex min-h-screen flex-col'>
        <Header variant='large' />

        <main id='main' className='flex-1 bg-blush text-ink'>
          {/* The intro card overlaps the hero image. No z-index, so the mobile menu stays on top. */}
          <Container className='relative -mt-8 md:-mt-20'>
            {/* The header already shows the brand, so the slogan is the page title. */}
            <div className='grid gap-6 rounded-card bg-off-white p-6 shadow-lifted sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-14'>
              {/* Smaller than a one-word title, so the longer slogan keeps whole words per line. */}
              <Heading
                level={1}
                size='title'
                className='min-[24rem]:text-4xl lg:text-6xl'
              >
                No hacemos papelería, creamos momentos.
              </Heading>
              <Lead>
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
              <Heading level={2} className='reveal text-center'>
                ¿Qué ofrecemos?
              </Heading>
            }
          >
            <ServiceRows services={SERVICES} />
          </Section>

          <Section
            className='bg-navy text-center text-off-white'
            heading={
              <Heading level={2} className='reveal'>
                ¿Hablamos?
              </Heading>
            }
          >
            <div className='reveal'>
              <Button href='/contact' variant='secondary'>
                Escribidnos
              </Button>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}

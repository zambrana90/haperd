import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';
import { Section } from '@/components/ui/Section';
import { SERVICES } from '@/content/home';

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
          <ul className='grid gap-6 md:grid-cols-2 md:gap-8'>
            {SERVICES.map((service) => (
              <li
                key={service.title}
                className='flex flex-col items-start gap-4 rounded-card bg-white p-6 shadow-soft sm:p-10'
              >
                <Heading level={3}>{service.title}</Heading>
                {service.description.map((paragraph) => (
                  <p key={paragraph} className='text-lg'>
                    {paragraph}
                  </p>
                ))}
                {/* Pushed down, so the links line up across cards. */}
                <Button
                  href={service.link.href}
                  variant='secondary'
                  className='mt-auto'
                >
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

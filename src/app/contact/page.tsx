import { ContactForm } from '@/components/ContactForm';
import { FAQCollapse } from '@/components/FAQCollapse';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';
import { Section } from '@/components/ui/Section';
import { FAQ_ITEMS } from '@/content/faq';
import { SITE } from '@/content/site';

export default function Contact() {
  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <Header variant='compact' />
      <main id='main' className='w-full flex-1'>
        <Container className='grid max-w-5xl gap-10 pt-8 pb-section md:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16'>
          <div className='text-rose-ink'>
            <Heading level={1} size='title' className='mb-6 text-ink'>
              ¿Quieres ilustración en vivo para tu evento?
            </Heading>
            <Lead className='mb-6'>
              ¡Entonces hablemos!
              <br />
              Nuestro servicio de Live Art Illustration transforma momentos en
              recuerdos ilustrados, en tiempo real. Bodas, eventos de marca,
              celebraciones privadas... cualquier ocasión con alma merece ser
              contada con pinceles y color.
            </Lead>
            <p className='mb-4'>
              <strong className='text-ink'>¿Es una boda?</strong>
              <br />
              Perfecto. Puedes rellenar el formulario que tienes a continuación
              y nos ponemos en marcha para crear algo tan único como vosotros.
            </p>
            <p className='mb-4'>
              <strong className='text-ink'>
                ¿Es un evento de empresa o marca?
              </strong>
              <br />
              Genial. Escríbenos directamente a{' '}
              <a
                href={`mailto:${SITE.email}`}
                className='rounded-field font-semibold underline underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy'
              >
                {SITE.email}
              </a>{' '}
              contándonos un poquito sobre la idea y te preparamos una propuesta
              a medida.
            </p>
            <p>
              Cada evento es diferente, y eso es lo que más nos gusta. Lo
              importante es que tengas algo especial que todos recuerden... y se
              lleven a casa.
            </p>
          </div>
          <ContactForm />
        </Container>

        <Section
          className='bg-off-white'
          heading={
            <Heading level={2} className='text-center'>
              Preguntas Frecuentes
            </Heading>
          }
        >
          <div className='mx-auto flex max-w-3xl flex-col gap-4'>
            {FAQ_ITEMS.map((item) => (
              <FAQCollapse key={item.question} {...item} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

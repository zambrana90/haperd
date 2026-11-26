import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';
import { BRAND } from '@/content/seo';

export const metadata: Metadata = {
  title: `Página no encontrada | ${BRAND}`,
  description: 'No encontramos la página que buscas.',
};

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <Header variant='compact' />
      <main id='main' className='flex flex-1 items-center bg-blush text-ink'>
        <Container className='flex max-w-2xl flex-col items-center gap-6 py-section text-center'>
          <Heading level={1} size='title'>
            No encontramos esta página
          </Heading>
          <Lead>
            Puede que la dirección esté mal escrita o que la página ya no exista.
          </Lead>
          <Button href='/'>Volver al inicio</Button>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

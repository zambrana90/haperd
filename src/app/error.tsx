'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';

// The error itself is not shown or logged: visitors never see internal details.
export default function Error({ retry }: { retry: () => void }) {
  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <Header variant='compact' />
      <main id='main' className='flex flex-1 items-center bg-blush text-ink'>
        <Container className='flex max-w-2xl flex-col items-center gap-6 py-section text-center'>
          <Heading level={1} size='title'>
            Algo ha salido mal
          </Heading>
          <Lead>No hemos podido mostrar esta página. Inténtalo de nuevo.</Lead>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <Button onClick={() => retry()}>Reintentar</Button>
            <Button href='/' variant='secondary'>
              Volver al inicio
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

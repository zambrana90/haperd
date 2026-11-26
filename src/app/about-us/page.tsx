import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';
import { Signature } from '@/components/ui/Signature';
import { GREETING, INTRO, PORTRAIT, SIGN_OFF, STORY } from '@/content/about-us';

export default function AboutUs() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header variant='large' />
      <main id='main' className='flex-1 bg-white text-ink'>
        <Container className='max-w-5xl py-section'>
          <Heading level={1} className='mb-10 text-center md:mb-16'>
            About us
          </Heading>
          <div className='grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start lg:gap-16'>
            {/* The blush shape peeks out behind the portrait. */}
            <div className='relative mx-auto w-full max-w-72 lg:max-w-none'>
              <div
                aria-hidden='true'
                className='absolute inset-0 translate-x-3 translate-y-3 rounded-card bg-blush'
              />
              <Image
                src={PORTRAIT.src}
                alt={PORTRAIT.alt}
                width={PORTRAIT.width}
                height={PORTRAIT.height}
                sizes='(min-width: 1024px) 320px, 288px'
                className='relative h-auto w-full rounded-card shadow-soft'
              />
            </div>
            {/* Keeps lines short, and the medium weight keeps the thin body font legible. */}
            <div className='mx-auto w-full max-w-[60ch] text-lg font-medium'>
              <Lead className='mb-6 font-serif text-balance md:text-2xl'>
                {INTRO}
              </Lead>
              <div className='flex flex-col gap-5'>
                <p>
                  <strong className='font-semibold'>{GREETING.highlight}</strong>{' '}
                  {GREETING.text}
                </p>
                {STORY.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Signature className='mt-8'>
                {SIGN_OFF.farewell}
                <br />
                {SIGN_OFF.name}
              </Signature>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

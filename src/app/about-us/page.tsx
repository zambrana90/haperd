import Image from 'next/image';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PageTransition } from '@/components/PageTransition';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Lead } from '@/components/ui/Lead';
import { Signature } from '@/components/ui/Signature';
import { PAGE_SEO } from '@/content/seo';
import { GREETING, INTRO, PHOTO, SIGN_OFF, STORY } from '@/content/about-us';
import { pageMetadata } from '@/lib/seo/page-metadata';

export const metadata = pageMetadata(PAGE_SEO.aboutUs);

export default function AboutUs() {
  return (
    <PageTransition>
      <div className='flex min-h-screen flex-col'>
        <Header variant='large' />
        <main id='main' className='flex-1 bg-blush text-ink'>
          {/* The intro card overlaps the hero image, as on Live art. No z-index, so the mobile menu stays on top. */}
          <Container className='relative -mt-8 pb-section md:-mt-20'>
            {/* Mirrors Live art: the photo is on the left from `lg`. The text comes first in the document. */}
            <div className='grid gap-8 rounded-card bg-off-white p-6 shadow-lifted sm:p-10 lg:grid-cols-[2fr_3fr] lg:gap-12 lg:p-14'>
              {/* Keeps lines short, and the medium weight keeps the thin body font legible. */}
              <div className='mx-auto w-full max-w-[60ch] text-lg font-medium lg:mx-0'>
                <Heading level={1} className='md:text-8xl'>
                  About us
                </Heading>
                <Lead className='mt-6 mb-6 font-serif text-balance md:text-2xl'>
                  {INTRO}
                </Lead>
                <div className='flex flex-col gap-5'>
                  <p className='reveal'>
                    <strong className='font-semibold'>{GREETING.highlight}</strong>{' '}
                    {GREETING.text}
                  </p>
                  {STORY.map((paragraph) => (
                    <p key={paragraph} className='reveal'>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <Signature className='reveal mt-8'>
                  {SIGN_OFF.farewell}
                  <br />
                  {SIGN_OFF.name}
                </Signature>
              </div>
              {/*
                The story is long, so the photo stays in view beside it from `lg`.
                The file is 640 px square: it is never drawn wider than 384 px.
              */}
              <div className='relative order-first mx-auto w-full max-w-sm lg:sticky lg:top-8 lg:self-start'>
                {/* The blush shape peeks out behind the photo. */}
                <div
                  aria-hidden='true'
                  className='absolute inset-0 translate-x-3 translate-y-3 rounded-card bg-blush'
                />
                <Image
                  {...PHOTO}
                  alt={PHOTO.alt}
                  sizes='(min-width: 72rem) 371px, (min-width: 64rem) calc(40vw - 90px), (min-width: 30rem) 384px, (min-width: 25rem) calc(92vw - 48px), calc(100vw - 80px)'
                  className='relative h-auto w-full rounded-card shadow-soft'
                />
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}

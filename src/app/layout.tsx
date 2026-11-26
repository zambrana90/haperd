import type { Metadata } from 'next';
import {
  Dancing_Script,
  Fraunces,
  Geist_Mono,
  Quicksand,
} from 'next/font/google';
import { PAGE_SEO } from '@/content/seo';
import { getSiteUrl } from '@/lib/seo/site-url';
import './globals.css';

// The CSS variables are mapped to font tokens in globals.css.
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

// Signature only (About us), so it is not preloaded on every page.
const dancingScript = Dancing_Script({
  variable: '--font-dancing-script',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
});

// Each page sets its own metadata. These cover routes that don't, such as 404.
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: PAGE_SEO.home.title,
  description: PAGE_SEO.home.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='es'
      className={`${fraunces.variable} ${quicksand.variable} ${geistMono.variable} ${dancingScript.variable}`}
    >
      <body className='antialiased'>{children}</body>
    </html>
  );
}

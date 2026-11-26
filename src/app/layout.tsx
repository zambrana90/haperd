import type { Metadata } from 'next';
import {
  Dancing_Script,
  Fraunces,
  Geist_Mono,
  Quicksand,
} from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Haperd and co.',
  description: 'Live event illustration',
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
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className='antialiased'>{children}</body>
    </html>
  );
}

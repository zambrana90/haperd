import { SHARE_IMAGE_ALT } from '@/content/seo';

/** Served by src/app/opengraph-image.tsx. */
export const SHARE_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: SHARE_IMAGE_ALT,
};

// next/og cannot read the CSS tokens. A test keeps these equal to globals.css.
export const SHARE_IMAGE_COLORS = {
  background: '#f5e6e6', // --color-blush
  text: '#7f5250', // --color-rose-ink
};

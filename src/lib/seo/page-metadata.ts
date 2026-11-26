import type { Metadata } from 'next';
import { BRAND, type PageSeo } from '@/content/seo';
import { SHARE_IMAGE } from './share-image';

/**
 * A page's full metadata. Relative URLs resolve against the root layout's
 * metadataBase. Next.js merges `openGraph` shallowly, so each page states all
 * of it, the image included.
 */
export function pageMetadata({ path, title, description }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      siteName: BRAND,
      url: path,
      title,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SHARE_IMAGE],
    },
  };
}

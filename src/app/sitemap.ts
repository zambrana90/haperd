import type { MetadataRoute } from 'next';
import { PAGE_SEO } from '@/content/seo';
import { absoluteUrl } from '@/lib/seo/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(PAGE_SEO).map(({ path }) => ({ url: absoluteUrl(path) }));
}

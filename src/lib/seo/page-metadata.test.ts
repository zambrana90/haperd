import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { PAGE_SEO } from '@/content/seo';
import { pageMetadata } from './page-metadata';
import { SHARE_IMAGE, SHARE_IMAGE_COLORS } from './share-image';

const pages = Object.values(PAGE_SEO);

describe('pageMetadata', () => {
  it('gives every page its own title and description', () => {
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.description)).size).toBe(
      pages.length,
    );
  });

  it.each(pages)('sets canonical and share data for $path', (page) => {
    const { title, description, path } = page;
    expect(pageMetadata(page)).toMatchObject({
      title,
      description,
      alternates: { canonical: path },
      openGraph: { url: path, title, description, images: [SHARE_IMAGE] },
      twitter: { card: 'summary_large_image', images: [SHARE_IMAGE] },
    });
  });
});

describe('share image colors', () => {
  const css = readFileSync(
    new URL('../../app/globals.css', import.meta.url),
    'utf8',
  );

  it.each([
    ['--color-blush', SHARE_IMAGE_COLORS.background],
    ['--color-rose-ink', SHARE_IMAGE_COLORS.text],
  ])('matches %s', (token, value) => {
    expect(css).toContain(`${token}: ${value};`);
  });
});

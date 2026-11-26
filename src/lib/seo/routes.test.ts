import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('sitemap', () => {
  it('lists the four pages', () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      'https://example.com/',
      'https://example.com/live-art',
      'https://example.com/about-us',
      'https://example.com/contact',
    ]);
  });
});

describe('robots', () => {
  it('allows everything and links the sitemap', () => {
    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://example.com/sitemap.xml',
    });
  });
});

import { describe, expect, it } from 'vitest';
import { absoluteUrl, getSiteUrl } from './site-url';

describe('getSiteUrl', () => {
  it('prefers NEXT_PUBLIC_SITE_URL', () => {
    expect(
      getSiteUrl({
        NEXT_PUBLIC_SITE_URL: 'https://example.com',
        VERCEL_PROJECT_PRODUCTION_URL: 'project.vercel.app',
      }),
    ).toBe('https://example.com');
  });

  it('drops the trailing slash, path and surrounding spaces', () => {
    expect(
      getSiteUrl({ NEXT_PUBLIC_SITE_URL: ' https://example.com/path/ ' }),
    ).toBe('https://example.com');
  });

  it('falls back to the Vercel production domain over https', () => {
    expect(
      getSiteUrl({
        NEXT_PUBLIC_SITE_URL: '',
        VERCEL_PROJECT_PRODUCTION_URL: 'project.vercel.app',
      }),
    ).toBe('https://project.vercel.app');
  });

  it('falls back to localhost', () => {
    expect(getSiteUrl({})).toBe('http://localhost:3000');
  });

  it('rejects a value that is not a URL', () => {
    expect(() => getSiteUrl({ NEXT_PUBLIC_SITE_URL: 'example.com' })).toThrow();
  });
});

describe('absoluteUrl', () => {
  it('joins a path to the site URL', () => {
    const env = { NEXT_PUBLIC_SITE_URL: 'https://example.com/' };
    expect(absoluteUrl('/', env)).toBe('https://example.com/');
    expect(absoluteUrl('/live-art', env)).toBe('https://example.com/live-art');
  });
});

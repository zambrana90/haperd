type SiteUrlEnv = {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
};

/**
 * The site's canonical origin, without a trailing slash: NEXT_PUBLIC_SITE_URL,
 * else the Vercel production domain, else the local dev server.
 * Throws on a value that is not a URL, so a typo fails the build.
 */
export function getSiteUrl(env: SiteUrlEnv = process.env as SiteUrlEnv): string {
  const configured = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return new URL(configured).origin;

  // Vercel sets this one without a protocol.
  const vercelDomain = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelDomain) return new URL(`https://${vercelDomain}`).origin;

  return 'http://localhost:3000';
}

/** The absolute URL of a path on the site. */
export function absoluteUrl(path: string, env?: SiteUrlEnv): string {
  return new URL(path, getSiteUrl(env)).href;
}

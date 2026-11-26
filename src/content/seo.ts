/** Brand name as written in titles and on the share image. */
export const BRAND = 'Haperd & Co.';

export type PageSeo = {
  path: string;
  title: string;
  description: string;
};

/** One entry per public page. The sitemap lists them in this order. */
export const PAGE_SEO = {
  home: {
    path: '/',
    title: `${BRAND} | Papelería de boda e ilustración en vivo`,
    description:
      'No hacemos papelería, creamos momentos: papelería de boda, ilustración personalizada y arte en vivo.',
  },
  liveArt: {
    path: '/live-art',
    title: `Live art | ${BRAND}`,
    description:
      'Arte en vivo en vuestro evento: retratamos a vuestros invitados en directo y cada ilustración es un regalo que se llevan a casa.',
  },
  aboutUs: {
    path: '/about-us',
    title: `About us | ${BRAND}`,
    description: `Conoce a María, la mente (y el pincel) detrás de ${BRAND}`,
  },
  contact: {
    path: '/contact',
    title: `Contacto | ${BRAND}`,
    description:
      '¿Quieres ilustración en vivo para tu evento? Escríbenos y hablamos de tu boda, evento de marca o celebración.',
  },
} as const satisfies Record<string, PageSeo>;

export const SHARE_IMAGE_ALT = `Manos dibujando una ilustración, junto al nombre ${BRAND}`;

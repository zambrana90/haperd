import { LIVE_ART_PHOTO } from './live-art';

export type ServicePhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Service = {
  title: string;
  /** One photo, or two that are shown overlapping. */
  photos: readonly [ServicePhoto] | readonly [ServicePhoto, ServicePhoto];
  description: readonly string[];
  link: { href: string; label: string };
};

/** In reading order, one row each. */
export const SERVICES: readonly Service[] = [
  {
    title: 'Papelería de boda',
    photos: [
      {
        src: '/images/home/stationery-envelopes.jpg',
        alt: 'Sobres blancos forrados con una ilustración de viñedos y montañas',
        width: 640,
        height: 640,
      },
      {
        src: '/images/home/stationery-invitation.jpg',
        alt: 'Invitación con monograma y sobre de papel kraft entre ramas de olivo',
        width: 640,
        height: 640,
      },
    ],
    description: [
      'Nos mueve el amor, el diseño y todo lo que se sale del molde. Queremos conoceros, saber qué os hace especiales, cómo os conocisteis, cuál es vuestra canción... y usar todo eso como inspiración para crear una papelería de boda con vuestra esencia, pensada al detalle y hecha totalmente a medida.',
      'Nada de copiar y pegar.',
    ],
    link: { href: '/contact', label: 'Hablemos de vuestra papelería' },
  },
  {
    title: 'Ilustración personalizada',
    photos: [
      {
        src: '/images/home/personalised-illustration.jpg',
        alt: 'Tarjeta ilustrada con dos niños abrazados, el nombre Paula y una fecha',
        width: 639,
        height: 640,
      },
    ],
    description: ['Creamos ilustraciones personalizadas para vosotros.'],
    link: { href: '/contact', label: 'Hablemos de vuestra ilustración' },
  },
  {
    title: 'Live art',
    photos: [LIVE_ART_PHOTO],
    // The same sentence as on the Live art page.
    description: [
      'Tenemos un servicio que convierte los recuerdos en arte en tiempo real: arte en vivo.',
    ],
    link: { href: '/live-art', label: 'Descubrid Live art' },
  },
];

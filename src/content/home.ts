export type Service = {
  title: string;
  description: readonly string[];
  link: { href: string; label: string };
};

export const SERVICES: readonly Service[] = [
  {
    title: 'Papelería de boda',
    description: [
      'Nos mueve el amor, el diseño y todo lo que se sale del molde. Queremos conoceros, saber qué os hace especiales, cómo os conocisteis, cuál es vuestra canción... y usar todo eso como inspiración para crear una papelería de boda con vuestra esencia, pensada al detalle y hecha totalmente a medida.',
      'Nada de copiar y pegar.',
    ],
    link: { href: '/contact', label: 'Hablemos de vuestra papelería' },
  },
  {
    title: 'Live art',
    // The same sentence as on the Live art page.
    description: [
      'Tenemos un servicio que convierte los recuerdos en arte en tiempo real: arte en vivo.',
    ],
    link: { href: '/live-art', label: 'Descubrid Live art' },
  },
];

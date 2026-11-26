/** Shown on the Live art page and on its Home card. */
export const LIVE_ART_PHOTO = {
  src: '/images/live-art/guest-portrait.jpg',
  alt: 'Dibujo de una persona con traje naranja junto a una flor roja',
  width: 640,
  height: 640,
};

export type Step = {
  title: string;
  description: string;
};

// TODO(owner): sample text, approved as mock content on 2026-11-26. Replace it
// with the real steps (docs/project.md §12, question 3), then remove the
// "Texto de ejemplo" label from the Live art page.
export const SAMPLE_STEPS: readonly Step[] = [
  {
    title: 'Nos contáis vuestra idea',
    description: 'Hablamos sobre vuestro evento y lo que os hace especiales.',
  },
  {
    title: 'Elegimos el estilo',
    description: 'Pensamos juntos cómo queréis que sean las ilustraciones.',
  },
  {
    title: 'Pintamos en directo',
    description: 'Retratamos a vuestros invitados durante el evento.',
  },
  {
    title: 'Entregamos el recuerdo',
    description: 'Cada invitado se lleva a casa su ilustración.',
  },
];

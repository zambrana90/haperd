export const PORTRAIT = {
  // TODO(Phase 2): replace with María's real portrait from the owner, and
  // rewrite the alt text to describe it.
  src: '/images/about-us/portrait-placeholder.jpg',
  alt: 'Imagen provisional en lugar de un retrato',
  width: 800,
  height: 1000,
} as const;

export const INTRO = 'La mente (y el pincel) detrás de Haperd&Co.';

export const GREETING = {
  highlight: '¡Hola! Soy María,',
  text: 'y estoy al mando en este pequeño universo llamado Haperd&Co. Y aunque hoy me dedico a diseñar papelería para bodas, en realidad pinto desde que tengo memoria (y probablemente antes, si preguntas a mi madre).',
} as const;

export const STORY: readonly string[] = [
  'Desde muy pequeña, los lápices, las acuarelas y todo tipo de manualidades han sido mi forma de entender el mundo. Mientras otros niños hacían castillos de arena, yo los dibujaba. Mientras otros corrían por el parque, yo me quedaba mirando cómo la luz cambiaba el color de las hojas. Sí, era esa niña rara del cuaderno en mano. Spoiler: sigo siéndolo.',
  'Con el tiempo, convertí mi pasión en profesión, estudié diseño gráfico y así fue como años después nació Haperd&Co, un lugar donde se mezclan el diseño, la emoción y un poquito de magia con olor a papel nuevo. Me encanta crear cosas que hagan sonreír, que emocionen, que hagan a alguien decir: “¡Esto somos nosotros!”',
  'No creo en las bodas en serie, ni en las plantillas sin alma. Creo en las historias auténticas, en los detalles con sentido, en los dibujos hechos con cariño y en las invitaciones que hacen llorar a tu tía en cuanto las abre.',
  '¿Y sabéis qué es lo mejor? Que no estoy sola. A veces me acompaña un pincel en mano en plena boda, capturando momentos en vivo que se convierten en recuerdos ilustrados. Otras veces estoy detrás del ordenador, diseñando algo que todavía no existe, pero que ya late con vuestra esencia.',
  'Así que si habéis llegado hasta aquí y sentís que esto va con vosotros… Bienvenidos a Haperd.',
  'Aquí, cada trazo cuenta.',
];

export const SIGN_OFF = {
  farewell: 'con cariño',
  name: 'María',
} as const;

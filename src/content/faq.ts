export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: '¿Cuánto dura una ilustración en vivo durante el evento?',
    answer:
      'La duración depende del tipo de evento y la cantidad de ilustraciones solicitadas, pero normalmente cada ilustración toma entre 10 y 20 minutos.',
  },
  {
    question: '¿Puedo personalizar el estilo de la ilustración?',
    answer:
      '¡Por supuesto! Antes del evento hablaremos sobre tus preferencias de estilo, colores y detalles para que las ilustraciones reflejen tu personalidad y el espíritu del evento.',
  },
  {
    question: '¿Qué necesito proporcionar para reservar el servicio?',
    answer:
      'Solo tienes que ponerte en contacto con nosotros y contarnos un poco sobre tu evento. A partir de ahí, te guiaremos en los siguientes pasos y requisitos para la reserva.',
  },
];

import { SITE } from '@/content/site';

export type NotificationInput = {
  name: string;
  email: string;
  message: string;
};

export type Template = {
  subject: string;
  htmlContent: string;
  textContent: string;
};

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ENTITIES[character]);
}

function htmlDocument(title: string, body: string): string {
  return `<!doctype html>
<html lang="es">
<head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head>
<body>
${body}
</body>
</html>`;
}

/** To the owner. The subject is fixed, so no visitor text reaches a mail header. */
export function notificationTemplate({
  name,
  email,
  message,
}: NotificationInput): Template {
  const subject = 'Nuevo mensaje de contacto desde la web';
  const messageHtml = escapeHtml(message).replace(/\r\n|\r|\n/g, '<br>');

  return {
    subject,
    htmlContent: htmlDocument(
      subject,
      `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Mensaje:</strong></p>
<p>${messageHtml}</p>`,
    ),
    textContent: `Nombre: ${name}
Email: ${email}

Mensaje:
${message}`,
  };
}

/**
 * To the visitor. It takes no arguments on purpose: the form must not be able
 * to send visitor-written text to a stranger (project.md §9).
 */
export function confirmationTemplate(): Template {
  const subject = 'Hemos recibido vuestro mensaje';
  const greeting = '¡Hola!';
  const body = 'Hemos recibido vuestro mensaje y os responderemos.';
  const closing = 'Un saludo,';

  return {
    subject,
    htmlContent: htmlDocument(
      subject,
      `<p>${greeting}</p>
<p>${body}</p>
<p>${closing}<br>${escapeHtml(SITE.name)}</p>`,
    ),
    textContent: `${greeting}

${body}

${closing}
${SITE.name}`,
  };
}

/**
 * The contact form's validation (docs/project.md §6.1), shared by the form and
 * the API route. Safe to import in a client component. Changing it is a
 * contract change.
 */
import { z } from 'zod';

/** Lengths are counted after trimming, in the same units as `maxLength`. */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 3000 },
} as const;

// Includes the Unicode line and paragraph separators.
const NO_LINE_BREAKS = /^[^\n\v\f\r\u0085\u2028\u2029]*$/;

/**
 * A trimmed, non-empty string. A missing, non-string or blank value gets only
 * the `required` message.
 */
function requiredText(required: string) {
  return z
    .string({ error: required })
    .trim()
    .min(1, { error: required, abort: true });
}

export const contactSchema = z.object(
  {
    name: requiredText('Escribe tu nombre.')
      .min(CONTACT_LIMITS.name.min, {
        error: 'El nombre debe tener al menos 2 caracteres.',
      })
      .max(CONTACT_LIMITS.name.max, {
        error: 'El nombre no puede superar los 80 caracteres.',
      })
      .regex(NO_LINE_BREAKS, {
        error: 'El nombre no puede tener saltos de línea.',
      }),
    email: requiredText('Escribe tu email.')
      .max(CONTACT_LIMITS.email.max, {
        error: 'El email no puede superar los 254 caracteres.',
        abort: true,
      })
      .regex(NO_LINE_BREAKS, {
        error: 'El email no puede tener saltos de línea.',
        abort: true,
      })
      .regex(z.regexes.email, { error: 'Escribe un email válido.' }),
    message: requiredText('Escribe tu mensaje.')
      .min(CONTACT_LIMITS.message.min, {
        error: 'El mensaje debe tener al menos 10 caracteres.',
      })
      .max(CONTACT_LIMITS.message.max, {
        error: 'El mensaje no puede superar los 3000 caracteres.',
      }),
    /** The honeypot. See `isHoneypotFilled`. */
    website: z
      .string({ error: 'Deja este campo vacío.' })
      .trim()
      .max(0, { error: 'Deja este campo vacío.' })
      .optional(),
  },
  { error: 'Revisa los datos del formulario.' },
);

/** What the form sends and, once validated, what the API receives. */
export type ContactInput = z.infer<typeof contactSchema>;

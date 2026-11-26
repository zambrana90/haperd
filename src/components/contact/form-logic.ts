import { contactSchema, type ContactInput } from '@/lib/contact';

export type ContactField = 'name' | 'email' | 'message';
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactValues = Required<ContactInput>;

/** The visible fields, in page order. */
export const CONTACT_FIELDS: readonly ContactField[] = [
  'name',
  'email',
  'message',
];

export const EMPTY_VALUES: ContactValues = {
  name: '',
  email: '',
  message: '',
  website: '',
};

const fieldsSchema = contactSchema.omit({ website: true });

/**
 * The first error of each invalid field. The honeypot is left to the API, which
 * answers a filled one as a success (docs/project.md §6.2).
 */
export function validateContact(values: ContactValues): ContactErrors {
  const result = fieldsSchema.safeParse(values);
  const errors: ContactErrors = {};
  if (result.success) return errors;
  for (const field of CONTACT_FIELDS) {
    const issue = result.error.issues.find(({ path }) => path[0] === field);
    if (issue) errors[field] = issue.message;
  }
  return errors;
}

/** So a request that never answers still ends in the failed state. */
const TIMEOUT_MS = 20_000;

/**
 * Sends the enquiry. Only a successful status with `{ ok: true }` counts as
 * sent. The server's error text is never passed on.
 */
export async function sendContact(
  values: ContactValues,
): Promise<'sent' | 'failed'> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return 'failed';
    const body: unknown = await response.json();
    const ok =
      typeof body === 'object' &&
      body !== null &&
      'ok' in body &&
      body.ok === true;
    return ok ? 'sent' : 'failed';
  } catch {
    // Network failure, timeout or an answer that is not JSON.
    return 'failed';
  }
}

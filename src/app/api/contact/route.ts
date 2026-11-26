/** `POST /api/contact`. The steps are those of docs/project.md §6.2. */
import {
  contactSchema,
  isHoneypotFilled,
  type ContactErrorCode,
  type ContactResponse,
} from '@/lib/contact';
import { EmailError, sendConfirmation, sendNotification } from '@/lib/email';
import { readBody } from './read-body';

const ERRORS: Record<ContactErrorCode, { status: number; message: string }> = {
  invalid_request: { status: 400, message: 'La solicitud no es válida.' },
  invalid_input: { status: 400, message: 'Revisa los datos del formulario.' },
  send_failed: { status: 502, message: 'No se pudo enviar el mensaje.' },
};

function success() {
  return Response.json({ ok: true } satisfies ContactResponse);
}

function failure(code: ContactErrorCode) {
  const { status, message } = ERRORS[code];
  return Response.json({ error: { code, message } } satisfies ContactResponse, {
    status,
  });
}

/**
 * Only JSON is accepted. A page on another site cannot send that content type
 * without a CORS preflight, which this route does not allow.
 */
function isJson(request: Request): boolean {
  const mediaType = request.headers.get('content-type')?.split(';')[0];
  return mediaType?.trim().toLowerCase() === 'application/json';
}

/** The body's JSON object, or `null` for anything else. */
async function parseBody(request: Request): Promise<object | null> {
  if (!isJson(request)) return null;

  const text = await readBody(request);
  if (text === null) return null;

  try {
    const value: unknown = JSON.parse(text);
    return typeof value === 'object' && !Array.isArray(value) ? value : null;
  } catch {
    // Not logged: a parse error quotes the visitor's text.
    return null;
  }
}

/** Safe to log: the code and status only, never the error or its message. */
function errorLabel(error: unknown): string {
  if (!(error instanceof EmailError)) return 'unknown';
  return error.status ? `${error.code} ${error.status}` : error.code;
}

export async function POST(request: Request) {
  const body = await parseBody(request);
  if (!body) return failure('invalid_request');

  // A bot gets the same answer as a real send.
  if (isHoneypotFilled(body)) return success();

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return failure('invalid_input');
  const { name, email, message } = parsed.data;

  try {
    await sendNotification({ name, email, message });
  } catch (error) {
    console.error('Contact notification not sent:', errorLabel(error));
    return failure('send_failed');
  }

  try {
    await sendConfirmation(email);
  } catch (error) {
    // The owner has the enquiry, so the visitor still gets a success.
    console.error('Contact confirmation not sent:', errorLabel(error));
  }

  return success();
}

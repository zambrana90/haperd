/**
 * The one call to Brevo. Server only: it reads BREVO_API_KEY.
 *
 * Errors carry a code, and at most an HTTP status or variable names. Never add
 * the payload, the key, Brevo's response or the original error (`cause`): they
 * hold personal data or secrets, and callers log these errors.
 */

const ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
export const TIMEOUT_MS = 10_000;

export type EmailErrorCode = 'config' | 'network' | 'timeout' | 'rejected';

export class EmailError extends Error {
  readonly code: EmailErrorCode;
  /** Brevo's HTTP status, when the code is `rejected`. */
  readonly status?: number;

  constructor(code: EmailErrorCode, detail: string, status?: number) {
    super(`Email not sent: ${detail}`);
    this.name = 'EmailError';
    this.code = code;
    this.status = status;
  }
}

export type Address = { email: string; name?: string };

export type Email = {
  to: Address;
  replyTo: Address;
  subject: string;
  htmlContent: string;
  textContent: string;
};

export type EmailConfig = {
  apiKey: string;
  sender: Address;
  contactEmail: string;
};

/** Reads the variables of project.md §11, and throws if any is empty. */
export function readConfig(): EmailConfig {
  const values = {
    BREVO_API_KEY: process.env.BREVO_API_KEY?.trim() ?? '',
    BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL?.trim() ?? '',
    BREVO_SENDER_NAME: process.env.BREVO_SENDER_NAME?.trim() ?? '',
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL?.trim() ?? '',
  };

  const missing = Object.entries(values)
    .filter(([, value]) => !value)
    .map(([name]) => name);
  if (missing.length > 0) {
    throw new EmailError('config', `missing ${missing.join(', ')}`);
  }

  return {
    apiKey: values.BREVO_API_KEY,
    sender: {
      email: values.BREVO_SENDER_EMAIL,
      name: values.BREVO_SENDER_NAME,
    },
    contactEmail: values.CONTACT_TO_EMAIL,
  };
}

export async function sendEmail(
  { apiKey, sender }: EmailConfig,
  { to, ...email }: Email,
): Promise<void> {
  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({ sender, to: [to], ...email }),
      cache: 'no-store',
      // A redirect must not carry the key to another address.
      redirect: 'error',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new EmailError('timeout', 'Brevo did not answer in time');
    }
    throw new EmailError('network', 'could not reach Brevo');
  }

  // The body is never read; cancelling it frees the connection.
  await response.body?.cancel().catch(() => {});

  if (!response.ok) {
    throw new EmailError(
      'rejected',
      `Brevo answered ${response.status}`,
      response.status,
    );
  }
}

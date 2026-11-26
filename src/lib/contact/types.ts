/** The answers of `POST /api/contact` (docs/project.md §6.2). */

export type ContactSuccess = { ok: true };

/**
 * - `invalid_request` (400): bad JSON or content type
 * - `invalid_input` (400): the body fails the schema
 * - `send_failed` (502): the owner email was not sent
 */
export type ContactErrorCode =
  | 'invalid_request'
  | 'invalid_input'
  | 'send_failed';

export type ContactError = {
  error: { code: ContactErrorCode; message: string };
};

export type ContactResponse = ContactSuccess | ContactError;

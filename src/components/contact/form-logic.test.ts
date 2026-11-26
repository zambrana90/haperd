import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendContact, validateContact, type ContactValues } from './form-logic';

const valid: ContactValues = {
  name: 'Ana',
  email: 'ana@example.com',
  message: 'Hola, quiero información.',
  website: '',
};

describe('validateContact', () => {
  it('has no errors for a valid input', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('gives each empty field its message', () => {
    expect(
      validateContact({ name: '', email: '', message: '', website: '' }),
    ).toEqual({
      name: 'Escribe tu nombre.',
      email: 'Escribe tu email.',
      message: 'Escribe tu mensaje.',
    });
  });

  it('gives one message to a field that breaks several rules', () => {
    const name = `${'a'.repeat(80)}\nb`;
    expect(validateContact({ ...valid, name })).toEqual({
      name: 'El nombre no puede superar los 80 caracteres.',
    });
  });

  it('leaves a filled honeypot to the API', () => {
    expect(validateContact({ ...valid, website: 'x' })).toEqual({});
  });
});

describe('sendContact', () => {
  afterEach(() => vi.unstubAllGlobals());

  /** Replaces `fetch`, so nothing leaves the test. */
  function mockFetch(answer: () => Promise<Response>) {
    const fetchMock = vi.fn<typeof fetch>(answer);
    vi.stubGlobal('fetch', fetchMock);
    return fetchMock;
  }

  const json = (status: number, body: unknown) => () =>
    Promise.resolve(Response.json(body, { status }));

  it('posts every field as JSON and reports a success', async () => {
    const fetchMock = mockFetch(json(200, { ok: true }));
    await expect(sendContact(valid)).resolves.toBe('sent');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/contact');
    expect(init?.method).toBe('POST');
    expect(init?.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(JSON.parse(String(init?.body))).toEqual(valid);
  });

  it.each([
    [400, 'invalid_request'],
    [400, 'invalid_input'],
    [502, 'send_failed'],
  ])('fails on a %i %s answer', async (status, code) => {
    mockFetch(json(status, { error: { code, message: 'server text' } }));
    await expect(sendContact(valid)).resolves.toBe('failed');
  });

  it.each([{}, { ok: false }, null])(
    'fails on a 200 with the body %j',
    async (body) => {
      mockFetch(json(200, body));
      await expect(sendContact(valid)).resolves.toBe('failed');
    },
  );

  it('fails on an answer that is not JSON', async () => {
    mockFetch(() => Promise.resolve(new Response('<html>', { status: 200 })));
    await expect(sendContact(valid)).resolves.toBe('failed');
  });

  it('fails on a network error', async () => {
    mockFetch(() => Promise.reject(new TypeError('Failed to fetch')));
    await expect(sendContact(valid)).resolves.toBe('failed');
  });
});

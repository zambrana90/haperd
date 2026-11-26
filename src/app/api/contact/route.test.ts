import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';
import { MAX_BODY_BYTES } from './read-body';

// It throws outside a server bundle, and tests are not bundled by Next.
vi.mock('server-only', () => ({}));

const ENV = {
  BREVO_API_KEY: 'test-api-key',
  BREVO_SENDER_EMAIL: 'sender@example.com',
  BREVO_SENDER_NAME: 'Test Sender',
  CONTACT_TO_EMAIL: 'owner@example.com',
};

const VALID = {
  name: 'Visitor Name',
  email: 'visitor@example.com',
  message: 'Private message text',
  website: '',
};

const CONSOLE_METHODS = ['log', 'info', 'warn', 'error', 'debug'] as const;

const fetchMock = vi.fn<typeof fetch>();
const log = vi.fn();

const accepted = async () => new Response('{}', { status: 201 });
const refused = async () => new Response('provider details', { status: 401 });

beforeEach(() => {
  // The real email module runs against this mock, so nothing reaches Brevo.
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
  fetchMock.mockImplementation(accepted);
  log.mockReset();
  for (const method of CONSOLE_METHODS) {
    vi.spyOn(console, method).mockImplementation(log);
  }
  for (const [name, value] of Object.entries(ENV)) vi.stubEnv(name, value);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function post(body?: string, contentType: string | null = 'application/json') {
  return POST(
    new Request('http://localhost/api/contact', {
      method: 'POST',
      // Bytes, so that no content type is added when none is given.
      body: body === undefined ? undefined : new TextEncoder().encode(body),
      headers: contentType === null ? {} : { 'content-type': contentType },
    }),
  );
}

const postJson = (value: unknown) => post(JSON.stringify(value));

async function expectAnswer(
  response: Response,
  status: number,
  code?: string,
) {
  expect(response.status).toBe(status);
  expect(await response.json()).toEqual(
    code ? { error: { code, message: expect.any(String) } } : { ok: true },
  );
}

/** The recipients of the emails sent, in order. */
function recipients(): string[] {
  return fetchMock.mock.calls.map(
    ([, init]) => JSON.parse(String(init?.body)).to[0].email,
  );
}

describe('success', () => {
  it('notifies the owner, then confirms to the visitor', async () => {
    await expectAnswer(await postJson(VALID), 200);

    expect(recipients()).toEqual([ENV.CONTACT_TO_EMAIL, VALID.email]);
    expect(log).not.toHaveBeenCalled();
  });

  it('sends the trimmed values', async () => {
    await postJson({
      ...VALID,
      name: `  ${VALID.name}  `,
      email: ` ${VALID.email} `,
    });

    const notification = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(notification.replyTo).toEqual({
      name: VALID.name,
      email: VALID.email,
    });
  });

  it('accepts a content type with parameters, and no honeypot field', async () => {
    // `undefined` is left out of the JSON.
    const body = JSON.stringify({ ...VALID, website: undefined });

    await expectAnswer(
      await post(body, 'Application/JSON; charset=utf-8'),
      200,
    );
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('accepts the longest valid message with every character escaped', async () => {
    const body = JSON.stringify(VALID).replace(
      VALID.message,
      '\\u00e1'.repeat(3000),
    );

    await expectAnswer(await post(body), 200);
  });
});

describe('step 1: parse', () => {
  it.each([
    ['no content type', null],
    ['text/plain', 'text/plain'],
    ['a form', 'application/x-www-form-urlencoded'],
    ['multipart', 'multipart/form-data; boundary=x'],
    ['a look-alike type', 'application/jsonp'],
  ])('answers 400 to %s', async (_case, contentType) => {
    await expectAnswer(
      await post(JSON.stringify(VALID), contentType),
      400,
      'invalid_request',
    );
    expect(fetchMock).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });

  it.each([
    ['no body', undefined],
    ['an empty body', ''],
    ['broken JSON', '{"message": "Private'],
    ['null', 'null'],
    ['a string', '"text"'],
    ['a number', '1'],
    ['an array', '[]'],
  ])('answers 400 to %s', async (_case, body) => {
    await expectAnswer(await post(body), 400, 'invalid_request');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });

  it('answers 400 to an oversized body, even with a filled honeypot', async () => {
    const body = JSON.stringify({
      ...VALID,
      website: 'x'.repeat(MAX_BODY_BYTES),
    });

    await expectAnswer(await post(body), 400, 'invalid_request');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('stops reading an endless body', async () => {
    const cancel = vi.fn();
    const endless = new ReadableStream<Uint8Array>({
      pull: (controller) => controller.enqueue(new Uint8Array(1024)),
      cancel,
    });
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: endless,
      duplex: 'half',
    } as RequestInit);

    await expectAnswer(await POST(request), 400, 'invalid_request');
    expect(cancel).toHaveBeenCalled();
  });

  it('answers 400 when the body cannot be read', async () => {
    const broken = new ReadableStream({
      pull: (controller) => controller.error(new Error('connection lost')),
    });
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: broken,
      duplex: 'half',
    } as RequestInit);

    await expectAnswer(await POST(request), 400, 'invalid_request');
  });
});

describe('step 2: honeypot', () => {
  it.each([
    ['valid fields', VALID],
    ['invalid fields', {}],
  ])(
    'answers a filled honeypot with %s as a success and sends nothing',
    async (_case, fields) => {
      await expectAnswer(
        await postJson({ ...fields, website: 'https://spam.example' }),
        200,
      );

      expect(fetchMock).not.toHaveBeenCalled();
      expect(log).not.toHaveBeenCalled();
    },
  );
});

describe('step 3: validate', () => {
  it.each([
    ['an empty object', {}],
    ['only a message, as the old form sends', { message: VALID.message }],
    ['a short name', { ...VALID, name: 'a' }],
    ['a line break in the name', { ...VALID, name: 'Ana\nBcc: x' }],
    ['a bad email', { ...VALID, email: 'not-an-email' }],
    ['a short message', { ...VALID, message: 'short' }],
    ['a long message', { ...VALID, message: 'a'.repeat(3001) }],
    ['a non-string field', { ...VALID, message: ['a', 'b'] }],
    ['a non-string honeypot', { ...VALID, website: 1 }],
  ])('answers 400 to %s', async (_case, body) => {
    await expectAnswer(await postJson(body), 400, 'invalid_input');

    expect(fetchMock).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });
});

/** The whole log, which must hold nothing private. */
function expectSafeLog(entry: unknown[]) {
  expect(log.mock.calls).toEqual([entry]);
}

describe('step 4: notify', () => {
  it.each([
    ['Brevo refuses it', refused, 'rejected 401'],
    [
      'the network fails',
      async () => {
        throw new TypeError(`${VALID.email} ${ENV.BREVO_API_KEY}`);
      },
      'network',
    ],
  ])('answers 502 and stops when %s', async (_case, send, label) => {
    fetchMock.mockImplementation(send);

    await expectAnswer(await postJson(VALID), 502, 'send_failed');

    expect(fetchMock).toHaveBeenCalledOnce();
    expectSafeLog(['Contact notification not sent:', label]);
  });

  it('answers 502 without configuration, and calls nothing', async () => {
    vi.stubEnv('BREVO_API_KEY', '');

    await expectAnswer(await postJson(VALID), 502, 'send_failed');

    expect(fetchMock).not.toHaveBeenCalled();
    expectSafeLog(['Contact notification not sent:', 'config']);
  });

  it('keeps provider details out of the response', async () => {
    fetchMock.mockImplementation(refused);

    const text = await (await postJson(VALID)).text();

    expect(text).not.toMatch(/provider|brevo|401/i);
  });
});

describe('step 5: confirm', () => {
  it('still answers 200 when only the confirmation fails, and logs it safely', async () => {
    fetchMock.mockImplementationOnce(accepted).mockImplementationOnce(refused);

    await expectAnswer(await postJson(VALID), 200);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expectSafeLog(['Contact confirmation not sent:', 'rejected 401']);
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TIMEOUT_MS } from './brevo';
import { EmailError, sendConfirmation, sendNotification } from './index';
import { confirmationTemplate, escapeHtml } from './templates';

// It throws outside a server bundle, and tests are not bundled by Next.
vi.mock('server-only', () => ({}));

const ENV = {
  BREVO_API_KEY: 'test-api-key',
  BREVO_SENDER_EMAIL: 'sender@example.com',
  BREVO_SENDER_NAME: 'Test Sender',
  CONTACT_TO_EMAIL: 'owner@example.com',
};

const VISITOR = {
  name: 'Visitor Name',
  email: 'visitor@example.com',
  message: 'Private message text',
};

const CONSOLE_METHODS = ['log', 'info', 'warn', 'error', 'debug'] as const;

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  // Every test runs against the mock, so nothing reaches the network.
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
  fetchMock.mockImplementation(async () => new Response('{}', { status: 201 }));
  for (const [name, value] of Object.entries(ENV)) vi.stubEnv(name, value);
  for (const method of CONSOLE_METHODS) {
    vi.spyOn(console, method).mockImplementation(() => {});
  }
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function sentRequest() {
  expect(fetchMock).toHaveBeenCalledTimes(1);
  const [url, init] = fetchMock.mock.calls[0];
  return { url, init, payload: JSON.parse(String(init?.body)) };
}

const SENDERS = [
  ['sendNotification', () => sendNotification(VISITOR)],
  ['sendConfirmation', () => sendConfirmation(VISITOR.email)],
] as const;

describe.each(SENDERS)('%s request', (_label, send) => {
  it('posts JSON to Brevo with the key and a timeout', async () => {
    const timeout = vi.spyOn(AbortSignal, 'timeout');

    await expect(send()).resolves.toBeUndefined();

    const { url, init } = sentRequest();
    expect(url).toBe('https://api.brevo.com/v3/smtp/email');
    expect(init?.method).toBe('POST');
    expect(init?.redirect).toBe('error');
    expect(new Headers(init?.headers).get('api-key')).toBe(ENV.BREVO_API_KEY);
    expect(new Headers(init?.headers).get('content-type')).toBe(
      'application/json',
    );
    expect(timeout).toHaveBeenCalledWith(TIMEOUT_MS);
    expect(init?.signal).toBe(timeout.mock.results[0].value);
  });
});

describe('sendNotification payload', () => {
  it('goes to the owner, from the sender, with reply-to the visitor', async () => {
    await sendNotification(VISITOR);

    const { payload } = sentRequest();
    expect(Object.keys(payload).sort()).toEqual(
      ['htmlContent', 'replyTo', 'sender', 'subject', 'textContent', 'to'],
    );
    expect(payload.sender).toEqual({
      email: ENV.BREVO_SENDER_EMAIL,
      name: ENV.BREVO_SENDER_NAME,
    });
    expect(payload.to).toEqual([{ email: ENV.CONTACT_TO_EMAIL }]);
    expect(payload.replyTo).toEqual({
      email: VISITOR.email,
      name: VISITOR.name,
    });
    expect(payload.subject).toBe('Nuevo mensaje de contacto desde la web');
    for (const value of Object.values(VISITOR)) {
      expect(payload.htmlContent).toContain(value);
      expect(payload.textContent).toContain(value);
    }
  });

  it('escapes visitor input in the HTML and keeps it as typed in the text', async () => {
    const hostile = {
      name: '<img src=x onerror=alert(1)>',
      email: `"a&b'"@example.com`,
      message: '<a href="https://evil.example">click</a>\r\nsecond line\nthird',
    };

    await sendNotification(hostile);

    const { payload } = sentRequest();
    expect(payload.htmlContent).not.toContain('<img');
    expect(payload.htmlContent).not.toContain('<a ');
    expect(payload.htmlContent).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(payload.htmlContent).toContain('&quot;a&amp;b&#39;&quot;@example.com');
    expect(payload.htmlContent).toContain(
      '&lt;/a&gt;<br>second line<br>third',
    );
    expect(payload.textContent).toContain(hostile.message);
    expect(payload.subject).not.toContain('<img');
  });

  it('puts the reply-to name on one line, at most 70 characters', async () => {
    await sendNotification({
      ...VISITOR,
      name: `Ana\r\nBcc: x@example.com ${'🎨'.repeat(80)}`,
    });

    const { name } = sentRequest().payload.replyTo;
    expect(name).not.toMatch(/[\r\n]/);
    expect(Array.from(name)).toHaveLength(70);
    expect(name.endsWith('🎨')).toBe(true);
  });
});

describe('sendConfirmation payload', () => {
  it('goes to the visitor with reply-to the owner', async () => {
    await sendConfirmation(VISITOR.email);

    const { payload } = sentRequest();
    expect(payload).toEqual({
      sender: { email: ENV.BREVO_SENDER_EMAIL, name: ENV.BREVO_SENDER_NAME },
      to: [{ email: VISITOR.email }],
      replyTo: { email: ENV.CONTACT_TO_EMAIL },
      ...confirmationTemplate(),
    });
  });

  it('has fixed content that holds nothing from the visitor', async () => {
    // Even a caller that passes more than the address cannot add text.
    const loose = sendConfirmation as (...args: string[]) => Promise<void>;

    await loose(VISITOR.email, VISITOR.name, VISITOR.message);

    const { payload } = sentRequest();
    const content = [
      payload.subject,
      payload.htmlContent,
      payload.textContent,
    ].join('\n');
    for (const value of Object.values(VISITOR)) {
      expect(content).not.toContain(value);
    }
  });
});

describe('escapeHtml', () => {
  it('escapes the five special characters, ampersand once', () => {
    expect(escapeHtml(`& < > " ' &amp;`)).toBe(
      '&amp; &lt; &gt; &quot; &#39; &amp;amp;',
    );
  });

  it('leaves other text alone', () => {
    expect(escapeHtml('¡Hola, María!')).toBe('¡Hola, María!');
  });
});

/** Everything a caller could log from the error. */
function dump(error: EmailError): string {
  return [
    String(error),
    error.stack,
    String(error.cause),
    JSON.stringify(error, Object.getOwnPropertyNames(error)),
  ].join('\n');
}

const LEAK = [...Object.values(VISITOR), ...Object.values(ENV), 'provider body'];

// Failures whose original error holds private data, to prove it is dropped.
const PRIVATE = LEAK.join(' ');

const FAILURES = [
  [
    'network error',
    () => fetchMock.mockRejectedValue(new TypeError(PRIVATE)),
    { code: 'network', status: undefined },
  ],
  [
    'timeout',
    () =>
      fetchMock.mockRejectedValue(new DOMException(PRIVATE, 'TimeoutError')),
    { code: 'timeout', status: undefined },
  ],
  ...[400, 401, 429, 500].map(
    (status) =>
      [
        `status ${status}`,
        () => fetchMock.mockResolvedValue(new Response(PRIVATE, { status })),
        { code: 'rejected', status },
      ] as const,
  ),
] as const;

describe.each(SENDERS)('%s failures', (_label, send) => {
  async function failure(): Promise<EmailError> {
    const error = await send().then(
      () => null,
      (reason: unknown) => reason,
    );
    expect(error).toBeInstanceOf(EmailError);
    return error as EmailError;
  }

  function expectNothingLeaked(error: EmailError) {
    for (const value of LEAK) expect(dump(error)).not.toContain(value);
    for (const method of CONSOLE_METHODS) {
      expect(console[method]).not.toHaveBeenCalled();
    }
  }

  it.each(FAILURES)('throws on a %s', async (_name, arrange, expected) => {
    arrange();

    const error = await failure();

    expect(error).toMatchObject(expected);
    expectNothingLeaked(error);
  });

  it.each(Object.keys(ENV))('throws without %s', async (name) => {
    vi.stubEnv(name, '  ');

    const error = await failure();

    expect(error.code).toBe('config');
    expect(error.message).toContain(name);
    expect(fetchMock).not.toHaveBeenCalled();
    expectNothingLeaked(error);
  });

  it('logs nothing on success', async () => {
    await send();

    for (const method of CONSOLE_METHODS) {
      expect(console[method]).not.toHaveBeenCalled();
    }
  });
});

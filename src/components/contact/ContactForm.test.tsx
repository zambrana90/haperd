import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ContactForm } from '@/components/ContactForm';
import { Field } from './Field';

const html = renderToStaticMarkup(<ContactForm />);

describe('ContactForm', () => {
  it.each(['name', 'email', 'message'])('links the %s label', (name) => {
    expect(html).toContain(`for="contact-${name}"`);
    expect(html).toContain(`id="contact-${name}"`);
  });

  it('keeps the honeypot away from keyboard and screen readers', () => {
    const honeypot = html.match(
      /<div aria-hidden="true" class="sr-only">(<input[^>]*>)<\/div>/,
    )?.[1];
    expect(honeypot).toContain('name="website"');
    expect(honeypot?.toLowerCase()).toContain('tabindex="-1"');
  });

  it('cannot be submitted before JavaScript runs', () => {
    expect(html).toMatch(/<button[^>]*type="submit"[^>]*disabled=""/);
    expect(html).toContain('method="post"');
  });
});

describe('Field', () => {
  it('ties an error to its control', () => {
    const field = renderToStaticMarkup(
      <Field id='x' label='X' error='Mal' value='' readOnly />,
    );
    expect(field).toContain('aria-invalid="true"');
    expect(field).toContain('aria-describedby="x-error"');
    expect(field).toMatch(/<p id="x-error" aria-live="polite"[^>]*>Mal<\/p>/);
  });
});

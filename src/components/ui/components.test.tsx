import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import { Heading } from './Heading';
import { Section } from './Section';

describe('Button', () => {
  it('renders a non-submitting button by default', () => {
    const html = renderToStaticMarkup(<Button>Enviar</Button>);
    expect(html).toMatch(/^<button type="button"/);
    expect(html).not.toContain('aria-busy=');
    expect(html).not.toContain('disabled=""');
  });

  it('keeps its label while loading, and is busy and disabled', () => {
    const html = renderToStaticMarkup(
      <Button type='submit' loading>
        Enviando...
      </Button>,
    );
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('disabled=""');
    expect(html).toContain('Enviando...</button>');
  });

  it('renders a link when it has an href', () => {
    const html = renderToStaticMarkup(<Button href='/contact'>Hablamos</Button>);
    expect(html).toMatch(/^<a [^>]*href="\/contact"/);
  });
});

describe('Section', () => {
  it('is labelled by its heading', () => {
    const html = renderToStaticMarkup(
      <Section heading={<Heading level={2}>Título</Heading>}>Texto</Section>,
    );
    const id = html.match(/aria-labelledby="([^"]+)"/)?.[1];
    expect(id).toBeTruthy();
    expect(html).toContain(`<div id="${id}"`);
    expect(html).toContain('<h2 ');
  });

  it('has no label without a heading', () => {
    const html = renderToStaticMarkup(<Section>Texto</Section>);
    expect(html).not.toContain('aria-labelledby');
  });
});

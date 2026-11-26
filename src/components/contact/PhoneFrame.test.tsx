import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PhoneFrame } from './PhoneFrame';

const html = renderToStaticMarkup(
  <PhoneFrame>
    <form />
  </PhoneFrame>,
);

describe('PhoneFrame', () => {
  it('renders its content', () => {
    expect(html).toContain('<form></form>');
  });

  it('hides every decorative part from screen readers', () => {
    const parts = html.match(/<span[^>]*>/g) ?? [];
    expect(parts.length).toBeGreaterThan(0);
    for (const part of parts) expect(part).toContain('aria-hidden="true"');
  });
});

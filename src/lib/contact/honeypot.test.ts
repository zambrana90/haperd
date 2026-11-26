import { describe, expect, it } from 'vitest';
import { isHoneypotFilled } from '@/lib/contact';

describe('isHoneypotFilled', () => {
  it('is true for a filled value, even if other fields are invalid', () => {
    expect(isHoneypotFilled({ website: 'https://spam.example' })).toBe(true);
  });

  it.each([
    {},
    { website: '' },
    { website: '   ' },
    { website: undefined },
    { website: 42 },
    null,
    undefined,
    'website',
    [],
  ])('is false for %j', (body) => {
    expect(isHoneypotFilled(body)).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import { buttonClasses, cx, headingClasses } from './variants';

const classes = (value: string) => value.split(' ');

describe('cx', () => {
  it('joins class names and skips empty values', () => {
    expect(cx('a', false, undefined, null, '', 'b')).toBe('a b');
  });
});

describe('buttonClasses', () => {
  it('defaults to the primary variant', () => {
    expect(buttonClasses()).toBe(buttonClasses('primary'));
    expect(classes(buttonClasses())).toContain('bg-rose-deep');
  });

  it('maps the secondary variant to its own colors', () => {
    const result = classes(buttonClasses('secondary'));
    expect(result).toEqual(expect.arrayContaining(['bg-white', 'text-rose-ink']));
    expect(result).not.toContain('bg-rose-deep');
  });

  it.each(['primary', 'secondary'] as const)(
    'gives %s a 48px target, a focus ring and a disabled state',
    (variant) => {
      expect(classes(buttonClasses(variant))).toEqual(
        expect.arrayContaining([
          'min-h-12',
          'min-w-12',
          'focus-visible:outline-2',
          'disabled:opacity-50',
        ]),
      );
    },
  );

  it('appends extra classes', () => {
    expect(classes(buttonClasses('primary', 'w-full')).at(-1)).toBe('w-full');
  });
});

describe('headingClasses', () => {
  it.each([
    [1, 'text-5xl'],
    [2, 'text-3xl'],
    [3, 'text-xl'],
  ] as const)('gives level %i its default size', (level, expected) => {
    expect(classes(headingClasses(level))).toContain(expected);
  });

  it('lets the size differ from the level', () => {
    expect(headingClasses(1, 'subtitle')).toBe(headingClasses(3));
  });
});

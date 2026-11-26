import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/lib/contact';

const valid = {
  name: 'Ana',
  email: 'ana@example.com',
  message: 'Hola, quiero información.',
};

/** The error messages for one field, or none if the input passes. */
function errorsFor(field: string, value: unknown): string[] {
  const result = contactSchema.safeParse({ ...valid, [field]: value });
  if (result.success) return [];
  return result.error.issues
    .filter((issue) => issue.path[0] === field)
    .map((issue) => issue.message);
}

/** An address of exactly `length` characters. */
const emailOfLength = (length: number) =>
  `${'a'.repeat(length - '@example.com'.length)}@example.com`;

describe('contactSchema', () => {
  it('accepts a valid input, with or without an empty honeypot', () => {
    expect(contactSchema.parse(valid)).toEqual(valid);
    expect(contactSchema.parse({ ...valid, website: '' })).toEqual({
      ...valid,
      website: '',
    });
  });

  it('trims values and drops unknown fields', () => {
    const result = contactSchema.parse({
      name: '  Ana \n',
      email: ' ana@example.com ',
      message: '\n Hola, quiero información. ',
      website: '  ',
      extra: 'x',
    });
    expect(result).toEqual({ ...valid, website: '' });
  });

  it.each([
    ['name', 'Escribe tu nombre.'],
    ['email', 'Escribe tu email.'],
    ['message', 'Escribe tu mensaje.'],
  ])('requires %s, with one message', (field, message) => {
    for (const value of [undefined, null, 42, '', '   ']) {
      expect(errorsFor(field, value)).toEqual([message]);
    }
  });

  it.each([
    ['name', 'a'.repeat(2)],
    ['name', 'a'.repeat(80)],
    ['name', ` ${'a'.repeat(80)} `],
    ['email', emailOfLength(254)],
    ['message', 'a'.repeat(10)],
    ['message', 'a'.repeat(3000)],
    ['message', 'Primera línea\nSegunda línea'],
  ])('accepts %s at its limits', (field, value) => {
    expect(errorsFor(field, value)).toEqual([]);
  });

  it.each([
    ['name', 'a', 'El nombre debe tener al menos 2 caracteres.'],
    ['name', ' a ', 'El nombre debe tener al menos 2 caracteres.'],
    ['name', 'a'.repeat(81), 'El nombre no puede superar los 80 caracteres.'],
    [
      'email',
      emailOfLength(255),
      'El email no puede superar los 254 caracteres.',
    ],
    ['message', 'a'.repeat(9), 'El mensaje debe tener al menos 10 caracteres.'],
    [
      'message',
      'a'.repeat(3001),
      'El mensaje no puede superar los 3000 caracteres.',
    ],
  ])('rejects %s outside its limits', (field, value, message) => {
    expect(errorsFor(field, value)).toEqual([message]);
  });

  it.each(['\n', '\r', '\r\n', '\v', '\f', '\u0085', '\u2028', '\u2029'])(
    'rejects the line break %j in name and email',
    (lineBreak) => {
      expect(errorsFor('name', `Ana${lineBreak}Bcc: x`)).toEqual([
        'El nombre no puede tener saltos de línea.',
      ]);
      expect(errorsFor('email', `ana@example.com${lineBreak}x`)).toEqual([
        'El email no puede tener saltos de línea.',
      ]);
    },
  );

  it.each([
    'ana',
    'ana@',
    '@example.com',
    'ana@example',
    'ana @example.com',
    'ana@@example.com',
    'ana@example.com, eva@example.com',
    'Ana <ana@example.com>',
  ])('rejects the invalid email %j', (email) => {
    expect(errorsFor('email', email)).toEqual(['Escribe un email válido.']);
  });

  it.each(['https://spam.example', 'x', 42])(
    'rejects the filled honeypot %j',
    (website) => {
      expect(errorsFor('website', website)).toEqual(['Deja este campo vacío.']);
    },
  );

  it.each([null, 'text', []])('rejects the body %j', (body) => {
    const result = contactSchema.safeParse(body);
    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      'Revisa los datos del formulario.',
    ]);
  });
});

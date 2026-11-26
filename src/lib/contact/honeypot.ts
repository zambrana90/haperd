/**
 * Whether a parsed request body has a filled honeypot. The API calls this
 * before validating: a filled value gets a success answer and sends nothing
 * (docs/project.md §6.2). Blank text counts as empty, as in the schema.
 */
export function isHoneypotFilled(body: unknown): boolean {
  if (typeof body !== 'object' || body === null || !('website' in body)) {
    return false;
  }
  const { website } = body;
  return typeof website === 'string' && website.trim() !== '';
}

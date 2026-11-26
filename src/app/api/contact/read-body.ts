/**
 * The largest accepted request body. The longest valid message is about 18 KB
 * when every character is JSON-escaped, so this leaves room.
 */
export const MAX_BODY_BYTES = 32 * 1024;

/**
 * The body as text, or `null` if it is larger than `MAX_BODY_BYTES` or cannot
 * be read. It stops reading at the limit, and does not trust Content-Length.
 */
export async function readBody(request: Request): Promise<string | null> {
  if (!request.body) return '';

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = '';

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return text + decoder.decode();

      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
  } catch {
    return null;
  }
}

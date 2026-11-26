/**
 * All email goes through this module (project.md §6.3). Import it from server
 * code only.
 *
 * Both functions resolve once Brevo accepts the email and throw an `EmailError`
 * otherwise. Nothing here logs.
 */
import { readConfig, sendEmail } from './brevo';
import {
  confirmationTemplate,
  notificationTemplate,
  type NotificationInput,
} from './templates';

export { EmailError, type EmailErrorCode } from './brevo';
export type { NotificationInput } from './templates';

/** Brevo's limit for a display name. */
const MAX_NAME_LENGTH = 70;

function displayName(name: string): string {
  const singleLine = name.replace(/\s+/g, ' ').trim();
  // Counts code points, so an emoji is never cut in half.
  return Array.from(singleLine).slice(0, MAX_NAME_LENGTH).join('');
}

/** Sends the enquiry to the owner. Reply goes to the visitor. */
export async function sendNotification(
  input: NotificationInput,
): Promise<void> {
  const config = readConfig();
  const name = displayName(input.name);

  await sendEmail(config, {
    to: { email: config.contactEmail },
    replyTo: { email: input.email, ...(name && { name }) },
    ...notificationTemplate(input),
  });
}

/** Tells the visitor the message arrived. Reply goes to the owner. */
export async function sendConfirmation(email: string): Promise<void> {
  const config = readConfig();

  await sendEmail(config, {
    to: { email },
    replyTo: { email: config.contactEmail },
    ...confirmationTemplate(),
  });
}

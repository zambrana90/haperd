import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// To use this, set the following variables in your .env.local file:
// SMTP_HOST=smtp.example.com
// SMTP_PORT=465
// SMTP_USER=your_smtp_username
// SMTP_PASS=your_smtp_password
// CONTACT_TO_EMAIL=the address that receives the messages
// (For Gmail, you may need an App Password and use smtp.gmail.com)

function sendFailed() {
  return NextResponse.json(
    { success: false, error: 'No se pudo enviar el mensaje.' },
    { status: 500 }
  );
}

// Mail errors carry addresses and server replies, so only a code or name is logged.
function errorLabel(error: unknown): string {
  if (!(error instanceof Error)) return 'unknown error';
  return 'code' in error && typeof error.code === 'string'
    ? error.code
    : error.name;
}

export async function POST(req: NextRequest) {
  // An uncaught parse error would put part of the visitor's text in the logs.
  const body = await req.json().catch(() => null);
  if (body === null) return sendFailed();

  const { message } = body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return NextResponse.json(
      { success: false, error: 'Mensaje vacío.' },
      { status: 400 }
    );
  }

  const recipient = process.env.CONTACT_TO_EMAIL;
  if (!recipient) {
    console.error('Contact email not sent: CONTACT_TO_EMAIL is not set.');
    return sendFailed();
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `Web Contact <${process.env.SMTP_USER}>`,
      to: recipient,
      subject: 'Nuevo mensaje de contacto desde Haperd.com',
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', errorLabel(error));
    return sendFailed();
  }
}

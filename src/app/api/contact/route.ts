import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// To use this, set the following variables in your .env.local file:
// SMTP_HOST=smtp.example.com
// SMTP_PORT=465
// SMTP_USER=your_smtp_username
// SMTP_PASS=your_smtp_password
// (For Gmail, you may need an App Password and use smtp.gmail.com)

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message || typeof message !== 'string' || !message.trim()) {
    return NextResponse.json(
      { success: false, error: 'Mensaje vacío.' },
      { status: 400 }
    );
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
      to: 'zambrana90@gmail.com',
      subject: 'Nuevo mensaje de contacto desde Haperd.com',
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { success: false, error: 'No se pudo enviar el mensaje.' },
      { status: 500 }
    );
  }
}

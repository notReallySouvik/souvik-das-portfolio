import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_TO_EMAIL || 'temporary@example.com';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p>${String(message).replace(/\n/g, '<br />')}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong while sending the message.' },
      { status: 500 }
    );
  }
}
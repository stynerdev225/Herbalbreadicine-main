/**
 * Developed by Stiner.dev
 * Professional Web Developer
 * April 24, 2025
 * Contact: https://stiner.dev
 */

import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function sendContactEmail(data: {
  from: string;
  name: string;
  message: string;
}) {
  console.log('Starting email send attempt...'); // Debug log

  try {
    const result = await resend.emails.send({
      from: 'Herbal Breadicine <noreply@herbalbreadicine.com>',
      to: ['catering@herbalbreadicine.com'],
      replyTo: data.from,
      subject: `New Contact Form Message from ${data.name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.from}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `
    });

    console.log('Email sent successfully:', result);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Resend Error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send email'
    };
  }
}

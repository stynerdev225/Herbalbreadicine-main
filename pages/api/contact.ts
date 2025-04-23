import { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
const apiKey = import.meta.env.VITE_SENDGRID_API_KEY;
if (!apiKey) {
  console.error('SENDGRID_API_KEY is not set in environment variables');
}
sgMail.setApiKey(apiKey || '');

export default async function handler(
  req: Request,
  res: Response
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!apiKey) {
      throw new Error('SendGrid API key is not configured');
    }

    const { from, name, message } = req.body;

    const msg = {
      to: 'catering@herbalbreadicine.com',
      from: 'noreply@herbalbreadicine.com',
      replyTo: from,
      subject: `New Contact Form Message from ${name}`,
      text: `From: ${name} (${from})\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${from}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email' 
    });
  }
}

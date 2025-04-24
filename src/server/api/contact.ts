import { Request, Response, NextFunction } from 'express';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const contactHandler = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
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
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email' 
    });
  }
};

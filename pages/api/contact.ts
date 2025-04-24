/**
 * Developed by Stiner.dev
 * Professional Web Developer
 * April 24, 2025
 * Contact: https://stiner.dev
 */

import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Add CORS headers to allow requests from your deployed site
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Received contact form submission:', req.body);

  try {
    const { from, name, message } = req.body;
    
    // Validate inputs
    if (!from || !name || !message) {
      console.log('Missing required fields:', { from, name, message });
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Use environment variable or fallback to hardcoded key
    const apiKey = process.env.RESEND_API_KEY || 're_iNVybaUF_GMkLo2FvkPjrjnEiWgniytaj';
    
    console.log('Using Resend with API key:', apiKey.substring(0, 5) + '...');
    
    // Initialize Resend with API key
    const resend = new Resend(apiKey);

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'Herbal Breadicine <noreply@herbalbreadicine.com>',
      to: ['catering@herbalbreadicine.com'],
      replyTo: from,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${from}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    console.log('Email sent successfully:', result);

    // Also send to Google Sheets
    try {
      console.log('Sending to Google Sheets');
      const sheetResponse = await fetch('https://script.google.com/macros/s/AKfycbzfC-CUC4DNh4k28KFMhdgSDiyltVykWhijP6nLvoJqTdjbczb77W2n8kTHWO1fLotN/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: from,
          message: message
        }),
      });
      
      console.log('Google Sheets response:', await sheetResponse.text());
    } catch (sheetError) {
      console.error('Failed to send to Google Sheets:', sheetError);
      // Continue with the response even if Google Sheets fails
    }

    return res.status(200).json({ 
      success: true, 
      data: result 
    });
  } catch (error: any) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email: ' + (error.message || 'Unknown error') 
    });
  }
}

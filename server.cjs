const express = require('express');
const { config } = require('dotenv');
const { Resend } = require('resend');
const axios = require('axios');

// Load environment variables
config();

// Initialize Resend with your API key
const resend = new Resend('re_iNVybaUF_GMkLo2FvkPjrjnEiWgniytaj');

// Google Apps Script Web App URL - you'll replace this with your actual deployed web app URL
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || '';

// Function to save form submission to Google Sheets via Apps Script
async function saveToGoogleSheets(name, email, message) {
  try {
    // Check if Apps Script URL is configured
    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.warn('Google Apps Script URL not configured. Skipping sheet update.');
      return;
    }

    // Send data to the Google Apps Script Web App
    const response = await axios.post(GOOGLE_APPS_SCRIPT_URL, {
      name,
      email,
      message
    });
    
    console.log('Google Sheets update success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving to Google Sheets via Apps Script:', error);
    // Don't throw the error - we don't want to fail the entire request if Google Sheets fails
  }
}

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Contact form handler using Resend
app.post('/api/contact', async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, from, message } = req.body;

    if (!name || !from || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields'
      });
    }

    console.log('========== NEW MESSAGE ==========');
    console.log(`From: ${name} (${from})`);
    console.log(`To: catering@herbalbreadicine.com`);
    console.log(`Message: ${message}`);
    console.log('================================');

    // Send notification email to the owner
    const ownerEmailResult = await resend.emails.send({
      from: 'contact@herbalbreadicine.com',
      to: ['catering@herbalbreadicine.com'],
      subject: `New Contact Form Message from ${name}`,
      reply_to: from,
      text: `From: ${name} (${from})\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${from}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    if (ownerEmailResult.error) {
      console.error('Resend API error (owner email):', ownerEmailResult.error);
      throw new Error('Failed to send notification to owner');
    }

    // Send confirmation email to the customer
    const customerEmailResult = await resend.emails.send({
      from: 'contact@herbalbreadicine.com',
      to: [from],
      subject: 'Thank you for contacting Herbal Breadicine',
      text: 
`Dear ${name},

Thank you for contacting Herbal Breadicine. We have received your message and will get back to you as soon as possible.

For reference, here's a copy of your message:
"${message}"

If you need immediate assistance, please call us directly.

Warm regards,
The Herbal Breadicine Team
catering@herbalbreadicine.com`,
      html: `
        <h2>Thank you for contacting Herbal Breadicine</h2>
        <p>Dear ${name},</p>
        <p>Thank you for contacting Herbal Breadicine. We have received your message and will get back to you as soon as possible.</p>
        <p>For reference, here's a copy of your message:</p>
        <blockquote style="border-left: 2px solid #ddd; padding-left: 15px; margin-left: 15px; color: #555;">
          "${message}"
        </blockquote>
        <p>If you need immediate assistance, please call us directly.</p>
        <p>
          Warm regards,<br />
          The Herbal Breadicine Team<br />
          <a href="mailto:catering@herbalbreadicine.com">catering@herbalbreadicine.com</a>
        </p>
      `
    });

    if (customerEmailResult.error) {
      console.error('Resend API error (customer email):', customerEmailResult.error);
      // Continue even if customer email fails
    }

    // Save submission to Google Sheets via Apps Script
    await saveToGoogleSheets(name, from, message);

    console.log('Emails sent successfully:', {
      ownerEmail: ownerEmailResult.data,
      customerEmail: customerEmailResult.data
    });
    
    // Return success response
    return res.status(200).json({ 
      success: true,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to process your message. Please try again later.'
    });
  }
});

// Basic route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Contact form set up with Resend email service using domain herbalbreadicine.com`);
  if (GOOGLE_APPS_SCRIPT_URL) {
    console.log('Google Sheets integration is configured via Apps Script');
  } else {
    console.log('Google Sheets integration not configured - form submissions will not be saved to a spreadsheet');
  }
});

module.exports = app;
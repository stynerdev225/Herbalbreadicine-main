/**
 * Development API Server
 * This server handles API requests during local development
 */
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.send('Development API server is running');
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
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

    // Use your Resend API key
    const apiKey = 're_iNVybaUF_GMkLo2FvkPjrjnEiWgniytaj';
    
    // Initialize Resend with API key
    const resend = new Resend(apiKey);

    console.log('Sending email via Resend...');
    
    // 1. Send notification email to owner
    const ownerResult = await resend.emails.send({
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

    console.log('Owner notification email sent:', ownerResult);

    // 2. Send confirmation email to the client with more exciting content
    const clientResult = await resend.emails.send({
      from: 'Herbal Breadicine <noreply@herbalbreadicine.com>',
      to: [from],
      subject: `🌿 Thanks for reaching out to Herbal Breadicine's Magical Kitchen!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2c5e1a; margin-bottom: 5px;">✨ Your Journey with Herbal Breadicine Begins! ✨</h1>
            <p style="font-size: 18px; color: #666;">Where Culinary Magic Meets Healing Traditions</p>
          </div>
          
          <div style="background-color: #f8f5e6; border-radius: 10px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #2c5e1a;">
            <h2 style="color: #2c5e1a; margin-top: 0;">Hello ${name}!</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              Thank you for reaching out to us about our catering services! We're excited to potentially be part of your special occasion with our unique fusion of traditional baking and herbal medicine.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              <strong>Jacob's Vision:</strong> Our founder believes that food should be both healing and delicious. Drawing from ancient wisdom and over two decades of experience in organic farming and herbalism, we've created signature recipes that not only tantalize your taste buds but also nourish your body and soul.
            </p>
          </div>
          
          <div style="background-color: #ffffff; border-radius: 10px; padding: 20px; margin-bottom: 20px; border: 1px solid #e0e0e0;">
            <h3 style="color: #2c5e1a; margin-top: 0;">Your Message to Us:</h3>
            <blockquote style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2c5e1a; margin-left: 0; font-style: italic;">
              ${message.replace(/\n/g, '<br>')}
            </blockquote>
          </div>
          
          <div style="background-color: #f8f5e6; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #2c5e1a; margin-top: 0;">What Happens Next?</h3>
            <p style="font-size: 16px; line-height: 1.6;">
              We're reviewing your inquiry and will get back to you within 24-48 hours with personalized catering options that align with your needs. Our team is excited to craft a memorable culinary experience for your event!
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to explore our <a href="https://herbalbreadicine.com/menu" style="color: #2c5e1a; text-decoration: underline;">seasonal menu</a> for inspiration.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #2c5e1a; color: white; border-radius: 10px;">
            <h3 style="margin-top: 0;">Have an urgent question?</h3>
            <p>Reach us directly at <a href="mailto:catering@herbalbreadicine.com" style="color: #f8f5e6; text-decoration: underline;">catering@herbalbreadicine.com</a></p>
            <p>or call us at (510) 555-HERB</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 14px; color: #888;">Herbal Breadicine | Canticle Farm Oakland CA 94601</p>
            <p style="font-size: 12px; color: #888;">This is an automated response. Please don't reply to this email.</p>
          </div>
        </div>
      `
    });

    console.log('Client confirmation email sent:', clientResult);

    // Also send to Google Sheets
    try {
      console.log('Sending to Google Sheets...');
      
      // Format data for Google Sheets
      const sheetData = JSON.stringify({
        name: name,
        email: from,
        message: message
      });
      
      console.log('Sheet data:', sheetData);
      
      const sheetResponse = await fetch('https://script.google.com/macros/s/AKfycbzfC-CUC4DNh4k28KFMhdgSDiyltVykWhijP6nLvoJqTdjbczb77W2n8kTHWO1fLotN/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: sheetData,
      });
      
      const sheetResult = await sheetResponse.text();
      console.log('Google Sheets response:', sheetResult);
      
      if (!sheetResponse.ok) {
        throw new Error(`Google Sheets API responded with status: ${sheetResponse.status}`);
      }
    } catch (sheetError) {
      console.error('Failed to send to Google Sheets:', sheetError);
      // Continue with the response even if Google Sheets fails
    }

    return res.status(200).json({ 
      success: true, 
      data: {
        owner: ownerResult,
        client: clientResult
      }
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email: ' + (error.message || 'Unknown error') 
    });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Development API server running at http://localhost:${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
  }
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('Shutting down development API server...');
  server.close(() => {
    console.log('Development API server stopped');
    process.exit(0);
  });
});
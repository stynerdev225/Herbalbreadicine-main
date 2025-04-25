/**
 * Contact form handler for Herbal Breadicine (Edge Runtime)
 */

export default async (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log('Received contact form submission:', req.body);
    
    const { from, name, message } = req.body;
    
    // Validate required fields
    if (!from || !name || !message) {
      console.log('Missing required fields:', { from, name, message });
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Import Resend here to prevent issues with serverless environment
    const { Resend } = require('resend');
    
    // Use environment variable for API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Missing RESEND_API_KEY environment variable');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }
    
    const resend = new Resend(apiKey);

    // Send both emails in parallel
    const [ownerResult, clientResult] = await Promise.all([
      // 1. Send notification email to owner
      resend.emails.send({
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
      }),
      
      // 2. Send confirmation email to the client
      resend.emails.send({
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
      })
    ]);

    console.log('Emails sent:', { ownerResult, clientResult });

    // Send to Google Sheets in the background (doesn't block response)
    try {
      const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL || 'https://script.google.com/macros/s/AKfycbzfC-CUC4DNh4k28KFMhdgSDiyltVykWhijP6nLvoJqTdjbczb77W2n8kTHWO1fLotN/exec';
      
      // Fire and forget - don't await this promise
      fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: from, message })
      }).catch(err => console.error('Google Sheets error:', err));
      
    } catch (sheetError) {
      console.error('Failed to send to Google Sheets:', sheetError);
      // Continue even if Google Sheets fails
    }

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: "Thank you for your message! We'll be in touch soon."
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email: ' + (error.message || 'Unknown error') 
    });
  }
};
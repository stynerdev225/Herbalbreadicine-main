// Edge API route using Vercel Edge Functions
import { Resend } from 'resend';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Handle OPTIONS request for CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only allow POST method
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, message: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  try {
    const data = await request.json();
    console.log('Received contact form submission:', data);
    
    const { from, name, message } = data;
    
    // Validate required fields
    if (!from || !name || !message) {
      console.log('Missing required fields:', { from, name, message });
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Missing required fields' 
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Use API key directly (secure in Vercel's edge environment)
    const apiKey = 're_iNVybaUF_GMkLo2FvkPjrjnEiWgniytaj';
    const resend = new Resend(apiKey);

    // Send to Google Sheets first
    try {
      console.log('Sending to Google Sheets...');
      
      // Using the Google Sheets App Script Web App URL
      const sheetUrl = 'https://script.google.com/macros/s/AKfycbzfC-CUC4DNh4k28KFMhdgSDiyltVykWhijP6nLvoJqTdjbczb77W2n8kTHWO1fLotN/exec';
      
      const sheetResponse = await fetch(sheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: from,
          message: message
        }),
      });
      
      const sheetStatus = sheetResponse.status;
      console.log('Google Sheets response status:', sheetStatus);
      
      if (sheetStatus !== 200 && sheetStatus !== 201 && sheetStatus !== 204) {
        console.error('Google Sheets API returned non-success status:', sheetStatus);
      }
    } catch (sheetError) {
      console.error('Failed to send to Google Sheets:', sheetError.message);
      // Continue even if Google Sheets fails
    }

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

    // 2. Send confirmation email to the client
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

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! We\'ll be in touch soon.'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error in contact form handler:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Failed to process your request: ' + (error.message || 'Unknown error') 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
const https = require('https');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { firstName, company, phone, email, message } = JSON.parse(event.body);

    // Validate required fields
    if (!firstName || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Get environment variables
    const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL; // Comma-separated emails
    const FROM_EMAIL = process.env.FROM_EMAIL;

    if (!POSTMARK_API_KEY || !TO_EMAIL || !FROM_EMAIL) {
      console.error('Missing environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Prepare email content
    const emailBody = `
New Contact Form Submission from AutoSync 360

Name: ${firstName}
Company: ${company || 'N/A'}
Phone: ${phone || 'N/A'}
Email: ${email}

Message:
${message}

---
Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
    `.trim();

    const postmarkData = JSON.stringify({
      From: FROM_EMAIL,
      To: TO_EMAIL,
      Subject: `AutoSync 360 - New Contact Form Submission from ${firstName}`,
      TextBody: emailBody,
      MessageStream: 'outbound'
    });

    // Send email via Postmark API
    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.postmarkapp.com',
        port: 443,
        path: '/email',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': POSTMARK_API_KEY,
          'Content-Length': Buffer.byteLength(postmarkData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve({ success: true, data: JSON.parse(data) });
          } else {
            reject(new Error(`Postmark API error: ${res.statusCode} - ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(postmarkData);
      req.end();
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message
      })
    };
  }
};

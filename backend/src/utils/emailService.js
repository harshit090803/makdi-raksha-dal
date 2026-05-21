const nodemailer = require('nodemailer');

/**
 * Validates and triggers an email notification to the designated operations team.
 * Fully resilient: if SMTP credentials are missing, it logs a system notice and resolves gracefully.
 * 
 * @param {Object} payload 
 * @param {string} payload.type - 'General' | 'AnonymousTip'
 * @param {string} [payload.name] - Sender's name (omitted in anonymous tips)
 * @param {string} [payload.email] - Sender's email (omitted in anonymous tips)
 * @param {string} payload.message - Message content
 */
const sendNotificationEmail = async ({ type, name, email, message }) => {
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'makdirakshaldal@gmail.com';
  
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // Resilient fallback check
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.log('======================================================================');
    console.log('⚠️  SMTP NOTICE: Email credentials are not fully configured in environment.');
    console.log(`🚀 Contact/Tip forwarding to <${receiverEmail}> skipped.`);
    console.log('======================================================================');
    return { success: false, reason: 'SMTP_UNCONFIGURED' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: smtpPort === '465', // True for port 465, false for 587 or others
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      timeout: 10000 // 10 seconds connection timeout
    });

    const isTip = type === 'AnonymousTip';
    const subject = isTip 
      ? '[MRD Operations] Confidential Tip Submission' 
      : `[MRD Operations] General Inquiry from ${name || 'User'}`;

    // Clean, premium, professional political-tech styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body {
            background-color: #0c0404;
            color: #e5e5e5;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            margin: 0;
            padding: 40px 20px;
          }
          .card {
            background-color: #140808;
            border: 1px solid #dc2626;
            border-radius: 6px;
            max-width: 600px;
            margin: 0 auto;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(220, 38, 38, 0.15);
          }
          .header {
            background-color: #1f0b0b;
            border-bottom: 2px solid #dc2626;
            padding: 24px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 0.15em;
            margin: 0;
            text-transform: uppercase;
          }
          .content {
            padding: 30px;
          }
          .meta-row {
            border-bottom: 1px solid rgba(220, 38, 38, 0.15);
            padding: 12px 0;
            font-size: 13px;
          }
          .meta-label {
            color: #9ca3af;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            width: 120px;
            display: inline-block;
          }
          .meta-value {
            color: #ffffff;
            font-weight: 500;
          }
          .message-box {
            background-color: #060202;
            border: 1px solid rgba(220, 38, 38, 0.1);
            border-radius: 4px;
            padding: 20px;
            margin-top: 24px;
            font-size: 14px;
            line-height: 1.6;
            color: #e5e5e5;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #080303;
            padding: 16px;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            border-top: 1px solid rgba(220, 38, 38, 0.08);
            letter-spacing: 0.05em;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Makdi Raksha Dal</h1>
          </div>
          <div class="content">
            <div class="meta-row">
              <span class="meta-label">Transmission:</span>
              <span class="meta-value">${isTip ? 'Confidential Tip Submission' : 'General Inquiry'}</span>
            </div>
            ${!isTip ? `
            <div class="meta-row">
              <span class="meta-label">Sender Name:</span>
              <span class="meta-value">${name}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Sender Email:</span>
              <span class="meta-value">${email}</span>
            </div>
            ` : `
            <div class="meta-row" style="color: #ef4444; font-weight: bold;">
              <span class="meta-label">Security Note:</span>
              <span class="meta-value">Personally identifiable information is intentionally excluded for this transmission.</span>
            </div>
            `}
            <div class="meta-row">
              <span class="meta-label">Timestamp:</span>
              <span class="meta-value">${new Date().toUTCString()}</span>
            </div>
            
            <div class="message-box">${message}</div>
          </div>
          <div class="footer">
            MAKDI RAKSHA DAL &copy; 2026 | CENTRAL COMMUNICATIONS PORTAL
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"MRD Communications" <${smtpUser}>`,
      to: receiverEmail,
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Mail transmitted successfully. MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };

  } catch (err) {
    console.error('❌ Mail dispatch failed:', err.message);
    return { success: false, error: err.message };
  }
};

module.exports = { sendNotificationEmail };

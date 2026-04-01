import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@yourdomain.com';

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.warn('SMTP credentials are not fully configured. Emails will fail until SMTP env vars are set.');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('sendEmail skipped: SMTP not configured');
    return;
  }

  const mailOptions = {
    from: FROM_EMAIL,
    to,
    subject,
    html: html || text,
    text: text || undefined,
  };

  return transporter.sendMail(mailOptions);
}

export default sendEmail;

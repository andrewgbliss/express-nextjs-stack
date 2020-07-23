import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

const EMAIL_HOST = process.env.EMAIL_HOST;

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY || 'abc123',
    domain: process.env.MAILGUN_DOMAIN || 'localhost',
  },
};

const transporter = nodemailer.createTransport(mg(auth));

function sendMail(options) {
  return new Promise((resolve) => {
    transporter.sendMail(options, () => {
      return resolve();
    });
  });
}

const from = '"Support" <support@gmail.com>';

export default {
  register(to, hash) {
    const link = `${EMAIL_HOST}/register/complete/${hash}`;
    const options = {
      from,
      to,
      subject: 'Welcome to the Website! Confirm Your Email',
      text: `<h2>Welcome to the Website</h2><div>Go here to confirm</div><div>${link}</div>`,
      html: `<h2>Welcome to the Website</h2><a href="${link}">Click here to complete registration</a>`,
    };
    return sendMail(options);
  },
  resetPassword(to, hash) {
    const link = `${EMAIL_HOST}/reset-password/verify/${hash}`;
    const options = {
      from,
      to,
      subject: 'Reset Your Password',
      text: `Go here to reset your password ${link}`,
      html: `<h2>Reset your password</h2><a href="${link}">Click here to reset your password</a>`,
    };
    return sendMail(options);
  },
};

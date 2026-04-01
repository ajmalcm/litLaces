try {
  const nodemailer = require('nodemailer');
  console.log('nodemailer OK —', typeof nodemailer);
} catch (err) {
  console.error('nodemailer FAIL —', err && err.message);
  process.exitCode = 1;
}

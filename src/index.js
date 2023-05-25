const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

async function sendEmail() {
  const startDate = new Date().toISOString().split('T')[0]; // Current day
  const endDate = startDate;

  const apiUrl = `https://www.vattenfall.se/api/price/spot/pricearea/${startDate}/${endDate}/SN3`;

  try {
    // Make the GET request to the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Compose the email message
    const senderEmail = 'postmaster@sandboxaec0dc8bf1274c588e2bc3e067317ca4.mailgun.org';
    const senderPassword = '5fb686b5c174b1472ee530e16dfe25c9-db4df449-363cc86d';
    const recipientEmail = 'cmadu701@gmail.com';
    const subject = 'Electricity Price';
    let body = 'Electricity Price:\n\n';

    for (const item of data) {
      const timestamp = item.TimeStamp;
      const value = item.Value;
      const unit = item.Unit;

      body += `Timestamp: ${timestamp}\nValue: ${value} ${unit}\n\n`;
    }

    // Configure the SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: senderEmail,
      to: recipientEmail,
      subject: subject,
      text: body,
    });

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendEmail();

const nodemailer = require('nodemailer');
if (process.env.NODE_ENV !== 'production') {
      require('dotenv').config();
}

const createTransporter = () => {
      //SMTP config
      return nodemailer.createTransport({

            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS
            }
      });
}

const sendEmail = async (options) => {
      const transporter = createTransporter();

      const mailOptions = {
            form: process.env.EMAIL_USER,
            to: options.to,
            subject: options.subject,
            html: options.hmtl,
            text: options.text
      };
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent : ', info.messageId);
      return info;
};

module.exports = sendEmail;
import { createTransport } from 'nodemailer';
import config from '../config.js';

const transport = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: config.nodemailer.USER,
      pass: config.nodemailer.PWD
    },
});

const sendEmail = function (user) {
  const email = {
    from: 'Ecommerce app <validEmail>',
    to: config.nodemailer.USER,
    subject: 'New register!',
    text: `A new user just registered to the ecommerce!
      name: ${user.name},
      last_name: ${user.last_name},
      email: ${user.email},
      username: ${user.username},
      avatar: ${user.avatar},
      createdAt: ${user.createdAt},
    `
  }
  return transport.sendMail(email);
};

export default sendEmail;

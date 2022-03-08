import { createTransport } from 'nodemailer';

var gmailPwd = "vedjxodszjabqtdc";
const transport = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PWD
    },
});

const sendEmail = function (user) {
  const email = {
    from: 'Ecommerce app <validEmail>',
    to: process.env.NODEMAILER_USER,
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

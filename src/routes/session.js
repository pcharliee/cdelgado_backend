import express from 'express';
import upload from '../services/upload.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/nodemailer.js';
import { passportCall } from '../utils/middlewares.js';
const router = express.Router();

router.get('/current', passportCall('jwt'), function (req, res) {
  let user = req.user;
  res.send({ user: user });
});

router.get('/logout', function (req, res) {
  res.clearCookie('JWT_COOKIE');
  res.send({ message: 'Logged out. See you later' });
});

router.post('/register', [ upload.single('avatar'), passportCall('register') ],
   async function (req, res) {
     const user = req.user.payload;
//      const mail = {
//        from: 'Ecommerce app <paraDarleValidez>',
// //        to: process.env.NODEMAILER_USER,
//        to: 'carlosm.delgador@gmail.com',
//        subject: 'New register!',
//        text: `A new user just registered to the ecommerce!
//          name: ${user.name},
//          last_name: ${user.last_name},
//          email: ${user.email},
//          username: ${user.username},
//          avatar: ${user.avatar},
//          createdAt: ${user.createdAt},
//        `
//      };
     await sendEmail(user);
     res.send({ message: 'Signed up' });
   }
);

router.post('/login', passportCall('login'), function (req, res) {
  let user = req.user;
  let token = jwt.sign(user, process.env.JWT_SECRET);
  req.session.user = user;
  res.cookie('JWT_COOKIE', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  });
  res.send({ status: 'success', message: 'Successfully logged in' });
});

export default router;
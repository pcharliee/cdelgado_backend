import sendEmail from '../utils/nodemailer.js';
import jwt from 'jsonwebtoken';

const getCurrentUser = function (req, res) {
  let user = req.user;
  res.send({ user: user });
};

const logout = function (req, res) {
  res.clearCookie('JWT_COOKIE');
  res.send({ message: 'Logged out. See you later' });
}

const register = async function (req, res) {
  const user = req.user.payload;
  await sendEmail(user);
  res.send({ message: 'Signed up' });
};

const login = function (req, res) {
  let user = req.user;
  let token = jwt.sign(user, process.env.JWT_SECRET) 
  req.session.user = user;
  res.cookie('JWT_COOKIE', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  });
  res.send({ status: 'success', message: 'Successfully logged in' });
};

export default {
  getCurrentUser,
  logout,
  register,
  login,
};

import bcrypt from 'bcrypt';

export const createHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isPasswordValid = function (user, password) {
  return bcrypt.compareSync(password, user.password);
};

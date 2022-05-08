import passport from 'passport';

export const passportCall = function (strategy) {
  return async function (req, res, next) {
    return passport.authenticate(strategy, {
      failureRedirect: '/login',
      successRedirect: '/products'
    }, function (err, user, info) {
      if (err)   return next(err);
      if (!user) return res.send({ error: info.messages || info.toString() });
      
      req.user = user;
      next();
    })(req, res, next)
  };
};

export const isAdmin = function (req, res, next) {
  if (req.user.role != 'admin')
    return res.status(403).send({ user: 'Unauthorized' });

  next();
};

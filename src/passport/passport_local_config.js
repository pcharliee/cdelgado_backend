import passport from 'passport';
import local from 'passport-local';
import fbStrategy from 'passport-facebook';
import config from '../config.js';
import jwt from 'passport-jwt';
import { createLogger } from '../logger/logger.js';
import { users, products, carts } from '../daos/index.js';
import { createHash, isPasswordValid } from '../bcrypt/bcrypt.js';
import { cookieExtractor } from '../utils.js';

const LocalStrategy = local.Strategy;
const FacebookStrategy = fbStrategy.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const logger = createLogger();

const initializePassport = () => {
  let registerConfig = {
    passReqToCallback: true,
    usernameField: 'email',
    session: false
  };

  let jwtConfig = {
//     jwtFromRequest: ExtractJwt.fromExtractors([ cookieExtractor ]),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.SECRET 
  };

  passport.use('register', new LocalStrategy(registerConfig,
    async function (req, username, password, done) {
      try {
        if (!req.file)
          return done(null, false, { messages: `Couldnt get avatar` });
        let user = await users.findOne({ $or:
          [{ username: req.body.username }, { email: req.body.email }]
        });
        if (user)
          return done(null, false, { messages: 'User already exists' });
        const emptyCart = await carts.saveOne();
        try {
        const newUser = {
          username: req.body.username,
          password: createHash(password),
          email: username,
          name: req.body.name,
          last_name: req.body.last_name,
          role: 'user',
          avatar: req.file.location,
          cart: emptyCart.payload._id,
        };
          let result = await users.saveOne(newUser);
          return done (null, JSON.parse(JSON.stringify(result)));
        } catch (error) {
          logger.error(`REGISTER: There was an error while saving the user => ${error}`);
          done(error);
        }

      } catch (error) {
        logger.error(`REGISTER: There was an error with passport-local => ${error}`);
        done(error);
      }
  }));

  passport.use('login', new LocalStrategy({usernameField:'email'}, async function (username, password, done) {
    try {
      let user = await users.findOne({ email: username });
      if (!user) return done(null, false, { messages: `USER_NOT_FOUND`});

      if (!isPasswordValid(user, password))
        return done(null, false, { messages: `INVALID_PASSWORD` });
      
      return done (null, JSON.parse(JSON.stringify(user)));
    } catch (error) {
      logger.error(`LOGIN: There was an error with passport-local => ${error}`);
      return done(error);
    }
  }));

  passport.use('jwt', new JWTStrategy(jwtConfig, async function (jwt_payload, done) {
    try {
//       if (jwt_payload.role == 'admin') return done(null, jwt_payload);
      let user = await users.findOne({ _id: jwt_payload._id });
      if (!user) return done(null, false, { messages: 'USET_NOT_FOUND_FOR_JWT_TOKEN' });
      return done (null, JSON.parse(JSON.stringify(user)));
    } catch (error) {
      logger.error(`JWT: There was an error with passport-jwt => ${error}`);
      done(error);
    }
  }));

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    let user = await users.findOne({ _id: id });
    done(null, user);
  });
};

export default initializePassport;

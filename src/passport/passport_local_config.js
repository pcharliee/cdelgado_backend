import passport from 'passport';
import local from 'passport-local';
import fbStrategy from 'passport-facebook';
import config from '../config.js';
import jwt from 'passport-jwt';
import { createLogger } from '../logger/logger.js';
import { users, products } from '../daos/index.js';
import { createHash, isPasswordValid } from '../bcrypt/bcrypt.js';
import { cookieExtractor } from '../utils.js';

const LocalStrategy = local.Strategy;
const FacebookStrategy = fbStrategy.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const logger = createLogger();

//NOTE: temporary
const generateRandomCart = async () => {
  let limit = 5;
  const randomProducts = [];
  let allProducts = await products.getAll();
  for (let i = 0; i < limit; i++) {
    let randomItem = Math.floor(Math.random() * allProducts.payload.length);
    randomProducts.push(allProducts.payload[randomItem]);
  };
  return randomProducts;
};

const initializePassport = () => {
  let registerConfig = {
    passReqToCallback: true,
    usernameField: 'email',
    session: false
  };

  const fbConfig = {
    clientID: config.facebook.CLIENT_ID,
    clientSecret: config.facebook.CLIENT_SECRET,
    callbackURL: config.facebook.CALLBACK_URL,
    profileFields: [ 'emails', 'picture', 'displayName' ]
  };

  let jwtConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([ cookieExtractor ]),
    secretOrKey: config.jwt.SECRET 
  };

  passport.use('facebook', new FacebookStrategy(fbConfig, async function (accessToken, refreshToken, profile, done) {
    try {
      let userProfile = {
        name: profile.displayName.split(' ')[0],
        last_name: profile.displayName.split(' ')[1],
        avatar: profile.photos[0].value,
        password: 'N/A',
        username: `FB-${name}`,
        email: profile.emails[0].value
      }
      let user = await users.getByEmailOrCreate(userProfile);
      done(null, JSON.parse(JSON.stringify(user)));
    } catch (error) {
      done(error);
    }
  }));

  passport.use('register', new LocalStrategy(registerConfig,
    async function (req, username, password, done) {
      try {
        if (!req.file) return done(null, false, { messages: `Couldnt get avatar` });
        let user = await users.findOne({ $or:
          [{ username: req.body.username }, { email: req.body.email }]
        });
        if (user) return done(null, false, { messages: 'User already exists' });

        const newUser = {
          username: req.body.username,
          password: createHash(password),
          email: username,
          name: req.body.name,
          last_name: req.body.last_name,
          role: 'user',
          avatar: req.file.location, 
          cart: await generateRandomCart(),
        };

        try {
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
      //NOTE: add admin login conditional
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

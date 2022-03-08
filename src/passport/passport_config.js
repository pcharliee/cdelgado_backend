import passport from 'passport';
import fbStrategy from 'passport-facebook';
import { users } from '../daos/index.js';
const FacebookStrategy = fbStrategy.Strategy;

const fbConfig = {
  clientID: '657421888743969',
  clientSecret: 'f75896ac06fd04c77af548905636a035',
  callbackURL: 'https://8416-186-52-130-232.ngrok.io/auth/facebook/callback',
  profileFields: [ 'emails', 'picture', 'displayName' ]
};

const initializePassportConfig = function () {
  passport.use('facebook', new FacebookStrategy(fbConfig, async function (accessToken, refreshToken, profile, done) {
    try {
      let userProfile = {
        name: profile.displayName.split(' ')[0],
        last_name: profile.displayName.split(' ')[1],
        profilePic: profile.photos[0].value,
        password: 'N/A',
        username: 'N/A',
        email: profile.emails[0].value
      }
      let user = await users.getByEmailOrCreate(userProfile);
      done(null, JSON.parse(JSON.stringify(user)));
    } catch (error) {
      done(error);
    }
  }));

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    let user = await users.getById(id);
    done(null, user)
  });
};

export default initializePassportConfig;

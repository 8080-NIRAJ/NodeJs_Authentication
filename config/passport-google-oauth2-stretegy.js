import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import crypto from 'crypto';
import User from '../models/account.js';

// Tell passport to use new strategy for Google login
passport.use(
  new GoogleStrategy(
    {
      // Options for Google strategy
      clientID: '868023818867-7ted03orp7656s36g0ui8ffcic4mtjfs.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3500/user/auth/google/callback',
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // console.log(profile);
      // Find user
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          return done(null, user);
        }
        if (!user) {
          // If not found, create user and set it as req.user
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex'),
          });
          if (newUser) {
            return done(null, newUser);
          }
        }
      } catch (error) {
        console.log('Error in Google strategy passport', error);
        return done(error, false);
      }
    }
  )
);

export default passport;

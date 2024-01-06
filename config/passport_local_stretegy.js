import passport from 'passport';
import User from '../models/account.js';
import { Strategy as LocalStrategy } from 'passport-local';

// Authentication using Passport.js Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      try {
        // Find user and establish identity
        let user = await User.findOne({ email: email });
        console.log(user);

        if (!user || user.password !== password) {
          req.flash('error', 'Invalid user/password');
          console.log('User does not exist in db');
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        req.flash('error', error);
        console.log(error, 'Something went wrong');
        return done(error);
      }
    }
  )
);

// Serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  try {
    let user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    console.log('Error finding user in db during deserialize');
    return done(error);
  }
});

// Check if user is authenticated or not
passport.checkAuthentication = function (req, res, next) {
  // If user is authenticated, pass request to the next function (controller's action)
  if (req.isAuthenticated()) {
    console.log('User is authenticated');
    return next();
  }
  return res.redirect('/user/login');
};

// Set user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed-in user from the session cookie and we are just sending it into locals for the view
    res.locals.user = req.user;
  }
  next();
};

export default passport;

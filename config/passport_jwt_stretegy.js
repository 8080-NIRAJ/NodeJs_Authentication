import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: '4h9K1XfdeLlA',
};

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ email: jwt_payload.email });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;

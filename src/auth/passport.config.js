import passport from 'passport';
import usersModel from '../dao/models/users.model.js';
import LocalStrategy from 'passport-local';
import { isValidPassword } from '../utils/middlewares/validation.js';

const initializePassport = () => {
  passport.use(
    'authRegistration',
    new LocalStrategy({ usernameField: 'login_email', passwordField: 'login_password' }, async (login_email, login_password, done) => {
      try {
        const user = await usersModel.findOne({ user: login_email });
        if (user) {
          return done(null, false, { message: 'User already exists' });
        } else {
          return done(null, { _id: 0 });
        }
      } catch (err) {
        return done(err.message);
      }
    })
  );

  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'login_email', passwordField: 'login_password' }, async (login_email, login_password, done) => {
      try {
        const user = await usersModel.findOne({ user: login_email });
        if (!user) {
          return done(null, false, { message: `User doesn't exist` });
        }
        if (!isValidPassword(user, login_password)) {
          return done(null, false, { message: `Incorrect user or password` });
        }
        return done(null, user);
      } catch (err) {
        return done(err.message);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await usersModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err.message);
    }
  });
};

export default initializePassport;

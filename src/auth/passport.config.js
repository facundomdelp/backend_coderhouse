import passport from 'passport';
import LocalStrategy from 'passport-local';
import GithubStrategy from 'passport-github2';
import { generateRandomPassword } from '../utils/randomPass.js';
import UsersManager from '../services/users.dbclass.js';
import usersModel from './../models/users.model.js';
import bcrypt from 'bcrypt';

const usersManager = new UsersManager();

const initializePassport = () => {
  passport.use(
    'authRegistration',
    new LocalStrategy({ usernameField: 'login_email', passwordField: 'login_password' }, async (login_email, login_password, done) => {
      try {
        const user = await usersModel.findOne({ email: login_email });
        if (user) {
          return done(null, false, { message: 'User already exists' });
        } else {
          return done(null, { _id: 0 });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'login_email', passwordField: 'login_password' }, async (login_email, login_password, done) => {
      try {
        const user = await usersModel.findOne({ email: login_email });
        if (!user) {
          return done(null, false, { message: `User doesn't exist` });
        }
        const isValid = await bcrypt.compare(login_password, user.password);
        if (!isValid) {
          return done(null, false, { message: `Incorrect user or password` });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: 'Iv1.8083686c0b4f66cb',
        clientSecret: 'bc5f2d13ce67c16cde2c4977e50216c841dc3299',
        callbackUrl: 'http://localhost:8080/githubcallback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await usersModel.findOne({ email: profile._json.email });
          if (!user) {
            const randomPassword = generateRandomPassword(8);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            await usersManager.addUser({ email: profile._json.email, password: hashedPassword });
            return done(null, await usersModel.findOne({ email: profile._json.email }));
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await usersModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default initializePassport;

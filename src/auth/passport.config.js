import passport from 'passport';
import usersModel from '../dao/models/users.model.js';
import LocalStrategy from 'passport-local';
import GithubStrategy from 'passport-github2';
import { isValidPassword } from '../utils/middlewares/validation.js';
import UsersManager from '../dao/users.dbclass.js';
import { generateRandomPassword } from '../utils/randomPass.js';

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
        return done(err.message);
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
        if (!isValidPassword(user, login_password)) {
          return done(null, false, { message: `Incorrect user or password` });
        }
        return done(null, user);
      } catch (err) {
        return done(err.message);
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
            await usersManager.addUser({ email: profile._json.email, password: generateRandomPassword(8) }); // Si no existe el user lo crea en bdd, con una pass aleatoria que luego se hashea
            return done(null, await usersModel.findOne({ email: profile._json.email }));
          }
          return done(null, user);
        } catch (err) {
          return done(err.message);
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
      done(err.message);
    }
  });
};

export default initializePassport;

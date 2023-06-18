import passport from 'passport';
import usersModel from '../dao/models/users.model.js';
import LocalStrategy from 'passport-local';
import GithubStrategy from 'passport-github2';
import { isValidPassword } from '../utils/bcrypt.config.js';
import JWT from 'jsonwebtoken';
import jwt from 'passport-jwt';
import UsersManager from '../dao/users.dbclass.js';
import { generateRandomPassword } from '../utils/randomPass.js';

const usersManager = new UsersManager();
const JWTStrategy = jwt.Strategy;
const JWTExtractor = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies['login_token'];
  }
  return null;
};

const generateToken = (user, expiration) => {
  return JWT.sign(user, 'abcdefgh12345678', { expiresIn: expiration });
};

const authentication = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

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

  passport.use(
    'jwtAuth',
    new JWTStrategy(
      {
        jwtFromRequest: JWTExtractor.fromExtractors([cookieExtractor]),
        secretOrKey: 'abcdefgh12345678'
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
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

export { initializePassport, authentication, generateToken };

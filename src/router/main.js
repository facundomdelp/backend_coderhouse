import express from 'express';
import UsersManager from '../dao/users.dbclass.js';
import passport from 'passport';
import initializePassport from '../auth/passport.config.js';

const router = express.Router();
const usersManager = new UsersManager();

initializePassport();

const mainRouter = (store, baseUrl) => {
  router.get('/', async (req, res) => {
    store.get(req.sessionID, async (err, data) => {
      if (err) console.log(`Error while trying to retrieve data session (${err})`);
      if (data !== null && (req.session.userValidated || req.sessionStore.userValidated)) {
        res.redirect('/home/products');
      } else {
        res.redirect('/login');
      }
    });
  });

  router.post('/register', passport.authenticate('authRegistration' /* , { failureRedirect: '/regfail' } */), async (req, res) => {
    try {
      const { login_email, login_password } = req.body;
      await usersManager.addUser(login_email, login_password);
      req.session.userValidated = req.sessionStore.userValidated = true; // Preguntar esto!
      res.redirect('/');
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.post('/login', passport.authenticate('login' /* , { failureRedirect: '/loginfail' } */), async (req, res) => {
    try {
      if (!req.user) throw new Error({ message: 'Invalid credentials' });
      req.session.userValidated = req.sessionStore.userValidated = true; // Preguntar esto!
      req.sessionStore.userMail = req.body.login_email;
      res.redirect(baseUrl);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.get('/logout', async (req, res) => {
    req.session.userValidated = req.sessionStore.userValidated = false;
    req.session.destroy((err) => {
      req.sessionStore.destroy(req.sessionID, (err) => {
        if (err) console.log(`Error while trying to destroy the session (${err})`);
        console.log('Destroyed sesion');
        res.redirect(baseUrl);
      });
    });
  });

  return router;
};

export default mainRouter;

import express from 'express';
import UsersManager from '../dao/users.dbclass.js';
import passport from 'passport';
import { generateToken } from '../auth/passport.config.js';

const router = express.Router();
const usersManager = new UsersManager();

const mainRoutes = (store, baseUrl) => {
  router.get('/', async (req, res) => {
    store.get(req.sessionID, async (err, data) => {
      if (err) console.log(`Error while trying to retrieve data session (${err})`);
      if (req.session.userValidated || req.sessionStore.userValidated) {
        res.redirect('/home/products');
      } else {
        res.redirect('/login');
      }
    });
  });

  router.post('/register', passport.authenticate('authRegistration', { failureRedirect: '/register' }), async (req, res) => {
    try {
      const { first_name, last_name, age, login_email, login_password } = req.body;
      await usersManager.addUser({ firstName: first_name, lastName: last_name, age, email: login_email, password: login_password });

      const cartId = await usersManager.getCartId(login_email);
      req.sessionStore.cartId = cartId; // VER

      const date = new Date();
      const userdataForToken = { firstName: first_name, lastName: last_name, email: login_email, cartId, role: 'user' };
      const token = generateToken(userdataForToken, '24h');
      res.cookie('coder_login_token', token, {
        maxAge: date.setDate(date.getDate() + 1),
        secure: false, // true para operar solo sobre HTTPS
        httpOnly: true
      });

      res.redirect(baseUrl);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    try {
      const cartId = await usersManager.getCartId(login_email);
      req.sessionStore.cartId = cartId; // VER

      const { first_name, last_name, login_email } = req.body;
      const date = new Date();
      const userdataForToken = { firstName: first_name, lastName: last_name, email: login_email, cartId, role: 'user' };
      const token = generateToken(userdataForToken, '24h');
      res.cookie('coder_login_token', token, {
        maxAge: date.setDate(date.getDate() + 1),
        secure: false, // true para operar solo sobre HTTPS
        httpOnly: true
      });

      res.redirect(baseUrl);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {});

  router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    try {
      const cartId = await usersManager.getCartId(req.user.email);
      req.sessionStore.cartId = cartId; // VER

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

export default mainRoutes;

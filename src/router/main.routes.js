import express from 'express';
import UsersManager from '../dao/users.dbclass.js';
import passport from 'passport';

const router = express.Router();
const usersManager = new UsersManager();

const mainRouter = (store, baseUrl) => {
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
      await usersManager.addUser({ first_name, last_name, age, email: login_email, password: login_password });
      req.session.userValidated = req.sessionStore.userValidated = true;
      req.sessionStore.user = login_email;
      const cartId = await usersManager.getCartId(login_email);
      req.sessionStore.cartId = cartId;
      res.redirect(baseUrl);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    try {
      if (!req.user) throw new Error({ message: 'Invalid credentials' });
      req.session.userValidated = req.sessionStore.userValidated = true;
      req.sessionStore.user = req.body.login_email;
      const cartId = await usersManager.getCartId(req.body.login_email);
      req.sessionStore.cartId = cartId;
      res.redirect(baseUrl);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {});

  router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    try {
      req.session.userValidated = req.sessionStore.userValidated = true;
      req.sessionStore.user = req.user.email;
      const cartId = await usersManager.getCartId(req.user.email);
      req.sessionStore.cartId = cartId;
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

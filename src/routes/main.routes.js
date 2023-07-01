import express from 'express';
import passport from 'passport';
import { current, githubCallback, login, logout, register } from '../controllers/main.controllers.js';

const router = express.Router();

const mainRouter = (store, baseUrl) => {
  router.get('/', (req, res) => current(req, res, store));
  router.post('/register', passport.authenticate('authRegistration', { failureRedirect: '/register' }), (req, res) => register(req, res, baseUrl));
  router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => login(req, res, baseUrl));
  router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {});
  router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => githubCallback(req, res, baseUrl));
  router.get('/logout', (req, res) => logout(req, res, baseUrl));

  return router;
};

export default mainRouter;

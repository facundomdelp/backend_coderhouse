import express from 'express';
import { renderValidate } from '../middlewares/validation.js';
import { carts, login, messages, products, realTimeProducts, register } from '../controllers/views.controllers.js';

const router = express.Router();

const mainRouter = (BASE_URL, WS_URL) => {
  router.get('/login', (req, res) => login(req, res, BASE_URL));
  router.get('/register', register);
  router.get('/home/products', renderValidate, (req, res) => products(req, res, BASE_URL, WS_URL));
  router.get('/home/realTimeProducts', renderValidate, (req, res) => realTimeProducts(req, res, WS_URL));
  router.get('/home/messages', renderValidate, (req, res) => messages(req, res, BASE_URL, WS_URL));
  router.get('/home/carts/:cid', renderValidate, (req, res) => carts(req, res, BASE_URL));

  return router;
};

export default mainRouter;

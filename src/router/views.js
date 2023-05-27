import express from 'express';
import ProductManager from '../dao/productsManager.dbclass.js';
import MessagesManager from '../dao/messages.dbclass.js';
import CartsManager from '../dao/cartManager.dbclass.js';
import { renderValidate } from './middlewares/validation.js';

const router = express.Router();
const productManager = new ProductManager();
const messagesManager = new MessagesManager();
const cartsManager = new CartsManager();

const mainRouter = (BASE_URL, WS_URL) => {
  router.get('/login', async (req, res) => {
    res.render('login', {
      baseUrl: BASE_URL
    });
  });

  router.get('/register', async (req, res) => {
    res.render('register');
  });

  router.get('/home/products', renderValidate, async (req, res) => {
    const products = await productManager.getProducts(req.query);
    res.render('products', {
      products,
      baseUrl: BASE_URL
    });
  });

  router.get('/home/realTimeProducts', renderValidate, async (req, res) => {
    const products = await productManager.getProducts(req.query);
    res.render('realTimeProducts', {
      products,
      wsUrl: WS_URL
    });
  });

  router.get('/home/messages', renderValidate, async (req, res) => {
    const messages = await messagesManager.getMessages();
    res.render('messages', {
      messages,
      baseUrl: BASE_URL,
      wsUrl: WS_URL
    });
  });

  router.get('/home/carts/:cid', renderValidate, async (req, res) => {
    const cart = await cartsManager.getCartById(req.params.cid);
    res.render('cart', {
      cart: cart.products.map((product) => {
        const matchedProduct = cart.productsInCart.find((p) => p.id === product.id);
        return { ...product, ...matchedProduct };
      })
    });
  });

  return router;
};

export default mainRouter;

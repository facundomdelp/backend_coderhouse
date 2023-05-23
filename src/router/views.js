import express from 'express';
import ProductManager from '../dao/productsManager.db.js';
import MessagesManager from '../dao/messages.db.js';
import CartsManager from '../dao/cartManager.db.js';

const router = express.Router();
const productManager = new ProductManager();
const messagesManager = new MessagesManager();
const cartsManager = new CartsManager();

router.get('/products', async (req, res) => {
  const products = await productManager.getProducts(req.query);
  res.render('products', {
    products: products,
  });
});

router.get('/realTimeProducts', async (req, res) => {
  const products = await productManager.getProducts(req.query);
  res.render('realTimeProducts', {
    products,
  });
});

router.get('/messages', async (req, res) => {
  const messages = await messagesManager.getMessages();
  res.render('messages', {
    messages,
  });
});

router.get('/carts/:cid', async (req, res) => {
  const cart = await cartsManager.getCartById(req.params.cid);
  res.render('cart', {
    cart: cart.products.map((product) => {
      const matchedProduct = cart.productsInCart.find((p) => p.id === product.id);
      return { ...product, ...matchedProduct };
    }),
  });
});

export default router;
